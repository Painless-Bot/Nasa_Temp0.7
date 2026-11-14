/* ===== Voice: spoken emphasis cues + hands-free voice commands (emergency guides) =====
   1) Spoken cues: on key steps only, a short emphasised phrase is read aloud ("Start CPR now!").
      Not a chatbot: nothing else is spoken, and the crew never has to talk to it.
   2) Hands-free: with the mic on, saying "Next step" moves to the next step, as if the button was pressed.
      Also "Yes" / "No" on question steps, "Back" to undo, "Repeat" to hear the cue again.
   Uses the browser's built-in Web Speech API (speechSynthesis, SpeechRecognition). Every voice command is
   written to the event log, so the flight surgeon sees which steps were moved by voice. */
(function(){
  /* Emphasis cues per guide step: [English, Korean]. Steps without a cue stay silent. */
  const SAY = {
    "cpr:a":   ["Medical emergency! Call it out loud!", "응급 상황! 크게 외치세요!"],
    "cpr:d":   ["Strap the patient down!", "환자를 고정하세요!"],
    "cpr:e":   ["Start CPR now! Push hard and fast!", "CPR 실시! 강하고 빠르게 누르세요!"],
    "cpr:f":   ["Attach the AED!", "AED 부착!"],
    "cpr:g":   ["Give oxygen!", "산소 공급!"],
    "cpr:i":   ["Recovery position! Stay with them!", "회복 자세! 곁을 지키세요!"],
    "toxic:a": ["Mask on now!", "마스크 착용!"],
    "toxic:b": ["Move to the safe module! Close the hatch!", "안전 모듈로 이동! 해치를 닫으세요!"],
    "toxic:e": ["Rinse with water for fifteen minutes!", "물로 15분간 씻어내세요!"],
    "chest:a": ["Stop and strap in!", "멈추고 몸을 고정하세요!"],
    "chest:d": ["Start oxygen!", "산소 공급 시작!"],
    "dcs:b":   ["Serious signs! Tell the ground now!", "중증 징후! 지상에 바로 알리세요!"],
    "dcs:c":   ["One hundred percent oxygen!", "100% 산소 공급!"],
    "solar:a": ["Go to the storm shelter now!", "지금 대피소로 이동하세요!"],
    "solar:b": ["Everyone inside!", "전원 실내로!"],
    "clot:b":  ["Do not rub it!", "문지르지 마세요!"],
    "eye:a":   ["Do not rub your eye!", "눈을 비비지 마세요!"],
    "eye:b":   ["Rinse the eye for five minutes!", "5분간 눈을 씻으세요!"],
    "eye:d":   ["Shield the eye! Call the flight surgeon!", "안대 부착! 비행 군의관 호출!"],
    "fever:e": ["Urgent! Call the flight surgeon now!", "긴급! 지금 비행 군의관을 호출하세요!"],
    "head:b":  ["CO2 is high! Move to better air!", "CO2 높음! 환기가 잘 되는 곳으로!"],
    "sms:a":   ["Keep your head still!", "머리를 움직이지 마세요!"],
    "panic:e": ["Breathe slowly and deeply.", "천천히 깊게 숨 쉬세요."],
  };
  const EVENT_SAY = {
    swap:  ["Swap rescuers now!", "구조자 교대!"],
    due:   ["Time is up! Check again now!", "시간 종료! 다시 확인하세요!"],
    ask:   ["Say yes or no.", "예 또는 아니오로 답하세요."],
  };
  if(typeof KO!=="undefined") Object.assign(KO, {
    "Voice command: \"{0}\" → {1}": "음성 명령: \"{0}\" → {1}",
    "next step": "다음 단계", "yes": "예", "no": "아니오", "undo": "되돌리기", "repeat": "다시 듣기",
  });

  const ko = () => S.lang==="ko";
  const pick = pair => ko() ? pair[1] : pair[0];
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const V = {
    speak: LS.get("voice.speak", true),       // spoken cues on by default
    listen: false,                             // mic always starts off: it needs the user's permission
    rec: null, lastKey: null, busyUntil: 0, heard: "", note: "",
  };
  window.__voice = V;

  /* ---------- speaking ---------- */
  function voiceFor(lang){
    const vs = (window.speechSynthesis && speechSynthesis.getVoices()) || [];
    return vs.find(v=>v.lang && v.lang.toLowerCase().startsWith(lang)) || null;
  }
  function say(text){
    if(!V.speak || !text || !window.speechSynthesis) return;
    try{
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = ko() ? "ko-KR" : "en-US";
      const v = voiceFor(ko() ? "ko" : "en"); if(v) u.voice = v;
      u.rate = 1.05; u.volume = 1;
      u.onend = u.onerror = () => { V.busyUntil = Date.now() + 700; };   // don't hear our own voice as a command
      V.busyUntil = Date.now() + Math.min(6000, 500 + text.length*80);   // fallback if onend never fires
      speechSynthesis.speak(u);
    }catch(e){}
  }
  function stepKey(){ return R ? (R.finished ? R.gid+":done" : R.gid+":"+R.cur) : null; }
  function cueNow(){ return R && !R.finished && SAY[R.gid+":"+R.cur] ? pick(SAY[R.gid+":"+R.cur]) : ""; }

  /* ---------- listening ---------- */
  const norm = s => s.toLowerCase().replace(/[.,!?。！？]/g, " ").replace(/\s+/g, " ").trim();
  function matchCmd(t){
    if(/\b(back|undo|previous)\b|이전|뒤로|되돌려/.test(t)) return "undo";
    if(/\b(repeat|again|say again)\b|다시 ?말|반복|다시 ?듣/.test(t)) return "repeat";
    if(/\b(no|nope|negative)\b|^아니|아니요|아니오|아뇨/.test(t)) return "no";
    if(/\b(yes|yeah|yep|affirmative)\b|^(예|네|응)(\s|$)|맞아/.test(t)) return "yes";
    if(/\bnext\b|\bcontinue\b|\bdone\b|다음|넥스트|넘겨|완료/.test(t)) return "next";
    return null;
  }
  function act(cmd, heard){
    if(!R || R.finished) return false;
    const q = sel => document.querySelector("#sosRun "+sel);
    const s = PROT[R.gid].steps.find(x=>x.id===R.cur);
    let btn = null;
    if(cmd==="next"){
      if(s && s.type==="ask"){ say(pick(EVENT_SAY.ask)); return false; }
      btn = q("[data-next]") || q("#msLog");
    }
    else if(cmd==="yes") btn = q('[data-ans="yes"]');
    else if(cmd==="no") btn = q('[data-ans="no"]');
    else if(cmd==="undo") btn = q("#prevBtn:not([disabled])");
    else if(cmd==="repeat"){ const st = document.querySelector("#stepTxt"); say(cueNow() || (st ? st.textContent : "")); return true; }
    if(!btn) return false;
    log("Voice command: \"{0}\" → {1}", [heard, {t: cmd==="next"?"next step":cmd}]);
    V.lastKey = null;                 // let the new step speak its own cue
    btn.click();
    return true;
  }
  function startListening(){
    if(!SR){ V.note = ko() ? "이 브라우저는 음성 인식을 지원하지 않아요 (Chrome·Edge 사용)" : "Voice commands need Chrome or Edge"; paint(); return; }
    if(V.rec) try{ V.rec.abort(); }catch(e){}
    const r = new SR();
    r.lang = ko() ? "ko-KR" : "en-US";
    r.continuous = true; r.interimResults = false; r.maxAlternatives = 3;
    r.onresult = ev => {
      if(Date.now() < V.busyUntil) return;                       // ignore while a cue is being spoken
      for(let i=ev.resultIndex; i<ev.results.length; i++){
        if(!ev.results[i].isFinal) continue;
        const alts = [...ev.results[i]].map(a=>norm(a.transcript));
        V.heard = alts[0]; paint();
        for(const t of alts){ const c = matchCmd(t); if(c){ V.busyUntil = Date.now()+1200; act(c, alts[0]); return; } }
      }
    };
    r.onerror = e => {
      if(e.error==="not-allowed" || e.error==="service-not-allowed"){ V.listen = false; V.note = ko() ? "마이크 권한이 없어요" : "Microphone permission denied"; }
      else if(e.error==="network"){ V.note = ko() ? "음성 인식에 인터넷 연결이 필요해요" : "Voice recognition needs a network connection in this browser"; }
      paint();
    };
    r.onend = () => { if(V.listen && R && !R.finished) setTimeout(()=>{ if(V.listen) try{ r.start(); }catch(e){} }, 250); };
    V.rec = r; V.note = "";
    try{ r.start(); }catch(e){}
    paint();
  }
  function stopListening(){ V.listen = false; if(V.rec){ try{ V.rec.abort(); }catch(e){} V.rec = null; } paint(); }

  /* ---------- controls in the red emergency band ---------- */
  const bs = 'style="background:rgba(255,255,255,.15);color:#fff;border-color:rgba(255,255,255,.4)"';
  function paint(){
    const band = document.querySelector("#sosRun .em-band"); if(!band) return;
    let box = band.querySelector(".voice-ctl");
    if(!box){ box = document.createElement("span"); box.className = "voice-ctl"; const snd = band.querySelector("#sndBtn"); snd ? snd.after(box) : band.appendChild(box); }
    const L = (en, k) => ko() ? k : en;
    box.innerHTML = `<button class="btn" type="button" id="vSpeak" aria-pressed="${V.speak}" ${bs}>${V.speak?"🗣 "+L("Voice cues on","음성 안내 켜짐"):"🗣 "+L("Voice cues off","음성 안내 꺼짐")}</button>
      <button class="btn" type="button" id="vListen" aria-pressed="${V.listen}" ${bs} ${SR?"":"disabled"}>${V.listen?"🎙 "+L("Hands-free on","핸즈프리 켜짐"):"🎙 "+L("Hands-free off","핸즈프리 꺼짐")}</button>
      ${V.listen?`<span class="small v-hint">${L('Say "Next step", "Yes", "No", "Back" or "Repeat"','"다음 단계", "예", "아니오", "이전", "다시"라고 말하세요')}${V.heard?` · ${L("heard","인식")}: “${esc(V.heard)}”`:""}</span>`:""}
      ${V.note?`<span class="small v-hint">⚠ ${esc(V.note)}</span>`:""}`;
    box.querySelector("#vSpeak").onclick = () => { V.speak = !V.speak; LS.set("voice.speak", V.speak); if(!V.speak && window.speechSynthesis) speechSynthesis.cancel(); else say(cueNow()); paint(); };
    box.querySelector("#vListen").onclick = () => { if(V.listen) stopListening(); else { V.listen = true; startListening(); } };
  }

  /* ---------- hooks into the guide runner ---------- */
  const _renderRun = renderRun;
  renderRun = function(){
    _renderRun.apply(this, arguments);
    paint();
    const k = stepKey();
    if(k && k!==V.lastKey){ V.lastKey = k; const c = cueNow(); if(c) say(c); }
  };
  const _log = log;
  log = function(key){
    _log.apply(this, arguments);
    if(key==="CPR cycle {0} complete (2 min). Swap rescuers now.") say(pick(EVENT_SAY.swap));
    else if(key==="Timer due: {0}.") say(pick(EVENT_SAY.due));
  };
  const _exit = exitGuide;
  exitGuide = function(){ stopListening(); V.lastKey = null; V.heard = ""; if(window.speechSynthesis) speechSynthesis.cancel(); return _exit.apply(this, arguments); };
  const _setLang = setLang;
  setLang = function(){ const r = _setLang.apply(this, arguments); if(V.listen) startListening(); return r; };   // recognise in the new language
  if(window.speechSynthesis) speechSynthesis.onvoiceschanged = () => {};   // warms up the voice list in Chrome
})();
