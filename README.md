# Orbit Guide

**NASA Space Apps Challenge 2026 · Seoul · Team Temp0.7**
Challenge: *Create Health Monitoring Software for Astronauts on Space Missions*

Orbit Guide helps astronauts **without medical training** look after themselves and each other when Earth is minutes away. NASA already knows how the body changes in space, but that knowledge is written for doctors on Earth. Orbit Guide is the bridge between that knowledge and the crewmate who has to act.

| | |
| --- | --- |
| **Live app** | https://painless-bot.github.io/Nasa_Temp0.7/ (press **▶ Guided demo** for a 1-minute tour) |
| **Pitch deck (7 slides, PDF)** | https://painless-bot.github.io/Nasa_Temp0.7/Orbit-Guide-Pitch.pdf |
| **Source code** | this repository: `index.html`, `voice.js`, `vendor/` |

> Hackathon prototype. Not a medical device and not medical advice. All crew data is simulated. Emergency guides are example procedures that support, never replace, the onboard checklist and the flight surgeon.

## The problem

On a Moon or Mars mission a message to the flight surgeon can take up to about 20 minutes each way, so a question and its answer are 40 minutes apart. Care on board starts with a crewmate who may not be a physician, and who may be the one who falls ill. Crews have sensors and checklists; what they lack is a fast answer to "what does this number mean, and what do I do first?"

## Three bridges

1. **Knowledge → person.** A 3D body shows six body systems in four levels (Normal, Watch, Act, Urgent). Every value is judged two ways: against the astronaut's own normal from mission days 1–14, and against fixed clinical and NASA limits; the worse of the two wins, so slow drift is caught before a textbook limit. Tap a part for today's numbers, a small bar of where today sits in the personal range, a trend, what to do now and the source of every limit. A daily check-in says what to measure and how, filled by hand or from a (simulated) wearable.
2. **Person → person.** When a crewmate's own readings turn Urgent, a large alert in the middle of every screen says who needs help and why; if it is closed, a red chip stays in the header until help starts. One tap opens **11 step-by-step emergency guides** written for the helper ("Tap Kim's shoulders…"). CPR starts at once with a 110-per-minute beat and 2-minute swap alerts. Measure steps can be filled from the patient's wearable, and every reading goes into the patient's record.
3. **Space → Earth.** Every reading and step becomes a T+ timed log with patient, responder and the patient's usual range, sent to the flight surgeon with the real signal delay shown. The (simulated) reply says what was received and asks for the next piece of information that guide needs; all messages stay in the **Earth messages** inbox.

## Also in the app

- **Voice cues** read key steps aloud; **hands-free commands** ("start", "next", "next step", "yes", "no", "back", "repeat", "stop") run offline on the device. Every voice command is written to the log.
- **Built for real failures:** a guide in progress survives a crash or reload, timers keep running in the background, any step can be undone, and the log keeps every entry.
- **Six mission settings:** ISS, Gateway, Moon base, lunar rover, Mars transit and Mars base, each with its own signal delay, radiation dose, gravity and cabin CO₂. Cabin-wide problems (CO₂, solar storm) raise one cabin alert, not a personal alarm for everyone.
- **Built for stress:** one step per screen, big buttons, plain words, colour plus words and never colour alone. English and 한국어.
- **Demo helpers:** a 1-minute guided demo, scenario buttons (sleep debt, fever, solar storm, crewmate collapse…) and a "Random reading (demo)" button that fills a realistic normal or abnormal morning check-in.

## Built for Earth too

The same gap exists on Earth: the WHO and World Bank report that half of the world's people lack full access to essential health services. Antarctic stations, ships, remote villages and disaster zones face the same three problems (no doctor nearby, a non-doctor first responder, a link that can drop). Moving Orbit Guide to an Earth site changes only three things: the delay setting, the limits table and the guide list.

## How to run

Use the live link, or serve the folder locally (`python -m http.server 8000`, then open `http://localhost:8000`). No install and no build step.

- Keep `index.html`, `voice.js` and the `vendor/` folder together.
- **Offline:** everything works without the internet when the page is served (GitHub Pages after it has loaded, or localhost). three.js r160 is bundled in `vendor/three/` (MIT); hands-free voice commands run on the device with Vosk (`vendor/vosk/`, Apache-2.0, English command words; the 41 MB model loads the first time hands-free is turned on). Web fonts fall back to system fonts.
- Opening `index.html` by double-click also works, but browsers block local module files there, so the 3D body then loads three.js from the jsDelivr CDN (internet needed for 3D only).
- Hands-free commands need microphone permission, so serve the page over **https** (GitHub Pages) or localhost. If the offline engine cannot load, the app falls back to the browser's Web Speech API (Chrome or Edge, network needed).
- If the 3D body cannot load, every other feature still works.
- All data comes from one function, `DataSource.build()`; to connect real sensor data, replace that function and keep the daily record shape.

## NASA data and resources

- **5 Hazards of Human Spaceflight** (NASA HRP): every body system and emergency guide is tagged with its hazard (radiation, isolation and confinement, distance from Earth, gravity fields, hostile closed environment).
- **Human Health Risks** (NASA HRP): each system and guide links the matching HRP risk page.
- **Ongoing HRP Research**: background for the daily measurement routine (Standard Measures) and wearable monitoring.
- **NASA-STD-3001** and its technical briefs: cabin CO₂ limits, career (600 mSv) and solar-storm (250 mSv) radiation limits, decompression sickness steps, and the 11 emergency situations (Appendix E).
- **NASA OSDR** (Inspiration4 / SOMA clinical panels): the reference the simulated crew ranges are being calibrated against.
- **Canadian Space Agency** (partner): Bio-Monitor wearable monitoring (the wearable fill), radiation monitoring (the solar storm guide).

Individual astronaut medical records are not public and were not used. Thresholds come from the public references below; the personal-baseline rules are our own design. The full list with links is also in the app under **Method, data and sources**.

## AI use

We used Claude (Anthropic) during the hackathon to draft and revise code from our written specs, run browser tests, draft plain-language text, the Korean translation, the slides and the submission text, and to summarize NASA sources and check medical figures. The team set the requirements, made the design decisions, tested every feature and reviewed all text, and is responsible for the result. AI-assisted work is marked in code comments and in commit messages ("AI-assisted (Claude)"). No AI-generated images, video or audio are used: the 3D body and planets are drawn in code, and spoken cues use the device's own voices.

## Open-source code and fonts

- [three.js](https://github.com/mrdoob/three.js) r160, MIT licence (`vendor/three/`)
- [vosk-browser](https://github.com/ccoreilly/vosk-browser) and the [Vosk small English model](https://alphacephei.com/vosk/models) by Alpha Cephei, Apache License 2.0 (`vendor/vosk/`, see `vendor/vosk/NOTICE.md`)
- IBM Plex Sans, IBM Plex Sans KR, IBM Plex Mono and Saira Semi Condensed via Google Fonts, SIL Open Font License

## Team

Temp0.7: three members, roles shared.

## References

- [5 Hazards of Human Spaceflight](https://www.nasa.gov/hrp/hazards/) — NASA Human Research Program
- [Human Health Risks (HRP Risks)](https://www.nasa.gov/hrp/risks/) — NASA Human Research Program
- [Ongoing HRP Research (Standard Measures, ARCHeR, Tempus Pro)](https://www.nasa.gov/hrp/ongoing-hrp-research/) — NASA Human Research Program
- [Risk of Cardiovascular Adaptations](https://www.nasa.gov/reference/risk-of-cardiovascular-adaptations/) — NASA HRP
- [Risk of Altered Immune System Responses](https://www.nasa.gov/reference/risk-of-altered-immune-system-responses/) — NASA HRP
- [Risk of Host-Microorganism Interactions](https://www.nasa.gov/reference/risk-of-host-microorganism-interactions/) — NASA HRP
- [Risk of Hypoxia](https://www.nasa.gov/reference/risk-of-hypoxia/) — NASA HRP
- [Risk of Decompression Sickness](https://www.nasa.gov/reference/risk-of-decompression-sickness/) — NASA HRP
- [Risk of Injury and Compromised Performance from EVA](https://www.nasa.gov/reference/risk-of-injury-and-compromised-performance-from-extravehicular-activity-eva/) — NASA HRP
- [Risk of Reduced Cardiorespiratory and Musculoskeletal Fitness](https://www.nasa.gov/reference/risk-of-reduced-cardiorespiratory-and-musculoskeletal-fitness/) — NASA HRP
- [Risk of Spaceflight Associated Neuro-ocular Syndrome (SANS)](https://www.nasa.gov/reference/risk-of-spaceflight-associated-neuro-ocular-syndrome-sans/) — NASA HRP
- [Risk of Spaceflight-Induced Bone Changes](https://www.nasa.gov/reference/risk-of-spaceflight-induced-bone-changes/) — NASA HRP
- [Risk of Behavioral Conditions and Psychiatric Disorders](https://www.nasa.gov/reference/risk-of-behavioral-conditions-and-psychiatric-disorders/) — NASA HRP
- [Risk from Inadequate Sleep and Irregular Schedules](https://www.nasa.gov/reference/risk-from-inadequate-sleep-and-irregular-schedules/) — NASA HRP
- [Risk of Altered Sensorimotor and Vestibular Function](https://www.nasa.gov/reference/risk-of-altered-sensorimotor-and-vestibular-function/) — NASA HRP
- [Risk of Radiation-Induced Cancers](https://www.nasa.gov/reference/risk-of-radiation-induced-cancers/) — NASA HRP
- [Risk of Inadequate Food and Nutrition](https://www.nasa.gov/reference/risk-of-inadequate-food-and-nutrition/) — NASA HRP
- [Risk of Inadequate Systems Operations Support](https://www.nasa.gov/reference/risk-of-inadequate-systems-operations-support/) — NASA HRP
- [NASA-STD-3001 Space Flight Human-System Standard (crew health; career radiation limit 600 mSv)](https://www.nasa.gov/ochmo/human-spaceflight-and-aviation-standards/) — NASA
- [NASA-STD-3001 Technical Brief: Carbon Dioxide](https://www.nasa.gov/ochmo/human-spaceflight-and-aviation-standards/) — NASA OCHMO
- [NASA-STD-3001 Technical Brief: Decompression Sickness](https://www.nasa.gov/ochmo/human-spaceflight-and-aviation-standards/) — NASA OCHMO
- [NASA-STD-3001 Appendix E: Integrated Medical Model condition tables (E.2-1, E.2-2)](https://www.nasa.gov/ochmo/human-spaceflight-and-aviation-standards/) — NASA
- [Cardiopulmonary resuscitation in microgravity (NASA Technical Reports Server)](https://ntrs.nasa.gov/search?q=cardiopulmonary%20resuscitation%20microgravity) — NASA NTRS
- [ISS ammonia leak event analysis (NASA Technical Reports Server)](https://ntrs.nasa.gov/search?q=ISS%20ammonia%20leak) — NASA NTRS
- [Spaceflight Associated Neuro-ocular Syndrome studies (NASA Technical Reports Server)](https://ntrs.nasa.gov/search?q=spaceflight%20associated%20neuro-ocular%20syndrome) — NASA NTRS
- [Space adaptation syndrome / space motion sickness (NASA Technical Reports Server)](https://ntrs.nasa.gov/search?q=space%20adaptation%20syndrome) — NASA NTRS
- [Radiation protection for lunar missions (storm shelter, stowage and water shielding)](https://science.nasa.gov/) — NASA Science
- [Auñón-Chancellor SM, et al. Venous Thrombosis during Spaceflight. N Engl J Med 2020;382:89-90](https://doi.org/10.1056/NEJMc1905875) — Journal (NASA astronaut authors)
- [Crucian B, et al. Incidence of clinical symptoms during long-duration orbital spaceflight. Int J Gen Med 2016;9:383-391](https://doi.org/10.2147/IJGM.S114188) — NASA JSC authors
- [Zeitlin C, et al. Measurements of energetic particle radiation in transit to Mars on the Mars Science Laboratory. Science 2013;340:1080-1084](https://doi.org/10.1126/science.1235989) — Journal (NASA MSL RAD)
- [NASA Open Science Data Repository: Inspiration4 / SOMA clinical panels (OSD-569 to OSD-575)](https://osdr.nasa.gov/bio/repo/data/studies/OSD-569) — NASA OSDR
- [National Early Warning Score (NEWS) 2: score bands for pulse, blood pressure, temperature and oxygen saturation](https://www.rcplondon.ac.uk/projects/outputs/national-early-warning-score-news-2) — Royal College of Physicians (UK)
- [Understanding Blood Pressure Readings](https://www.heart.org/en/health-topics/high-blood-pressure/understanding-blood-pressure-readings) — American Heart Association
- [Diabetes testing: fasting blood sugar ranges](https://www.cdc.gov/diabetes/diabetes-testing/index.html) — US Centers for Disease Control and Prevention
- [Hypoglycemia (low blood glucose) levels](https://diabetes.org/living-with-diabetes/hypoglycemia-low-blood-glucose) — American Diabetes Association
- [Seven or more hours of sleep per night: a health necessity for adults](https://aasm.org/seven-or-more-hours-of-sleep-per-night-a-health-necessity-for-adults/) — American Academy of Sleep Medicine
- [Pulse oximetry at home: when a blood oxygen level of 92% or less needs urgent help](https://www.nhs.uk/) — NHS (UK)
- [Emergency oxygen guideline: target saturation 94–98% for most adults](https://www.brit-thoracic.org.uk/document-library/guidelines/emergency-oxygen/) — British Thoracic Society
- [High-quality CPR components (2025 guidelines)](https://www.vumc.org/resuscitation-program/sites/default/files/public_files/BLS/Heartsaver/Heartsaver-CPR-AED-Summary-High-Quality-CPR%20Components-2025-Guidelines.pdf) — American Heart Association
- [Half the world lacks access to essential health services (2017)](https://www.who.int/news-room/detail/13-12-2017-world-bank-and-who-half-the-world-lacks-access-to-essential-health-services-100-million-still-pushed-into-extreme-poverty-because-of-health-expenses) — WHO and World Bank
- [NASA-STD-3001 Technical Brief: Radiation Protection (solar particle event limit 250 mSv)](https://www.nasa.gov/ochmo/human-spaceflight-and-aviation-standards/) — NASA OCHMO
- [Venous Haemostasis (NASA and ESA study; related risk: venous thromboembolism during spaceflight)](https://www.nasa.gov/reference/venous-haemostasis/) — NASA / ESA
- [Panic disorder: what to do during a panic attack](https://www.nhs.uk/mental-health/conditions/panic-disorder/) — NHS (UK)
- [Health and Fitness Evaluations for Long Duration Microgravity Exposure (crew examine each other monthly)](https://ntrs.nasa.gov/api/citations/20060051792/downloads/20060051792.pdf) — NASA NTRS
- [Bio-Monitor: wearable health monitoring on the ISS](https://www.asc-csa.gc.ca/eng/sciences/bio-monitor.asp) — Canadian Space Agency (partner)
- [Monitoring radiation to protect astronaut health (2026-02-26)](https://www.asc-csa.gc.ca/eng/news/articles/2026/2026-02-26-monitoring-radiation-astronaut-health.asp) — Canadian Space Agency (partner)
- [Why do we conduct science experiments in space?](https://www.asc-csa.gc.ca/eng/iss/science/why-do-we-conduct-science-experiments-in-space.asp) — Canadian Space Agency (partner)
