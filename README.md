# Orbit Guide

**NASA Space Apps Challenge 2026 · Seoul · Team Temp0.7**
Challenge: *Create Health Monitoring Software for Astronauts on Space Missions*

Orbit Guide is a web app that lets astronauts **without medical training** check their own health on board and get **step-by-step emergency guides** that work even when Earth is minutes away.

**Live demo:** https://painless-bot.github.io/Nasa_Temp0.7/  <!-- turn on GitHub Pages: Settings → Pages → main / root -->

> Hackathon prototype. Not a medical device and not medical advice. All crew data is simulated.

## Why

On a Moon or Mars mission a message to the flight surgeon can take 4–24 minutes each way. The crew has to decide first, and most crew members are not doctors. Orbit Guide turns daily measurements into a plain-language picture of the body and, when something goes wrong, walks the crew through what to do, one step at a time.

## Features

- **3D body self-check** — tap a glowing body part to see that system's status, your own normal range, a 28-day trend and what to do now. Six systems, four colour-coded levels (Normal, Watch, Act, Urgent).
- **Personal baseline** — each value is compared with the astronaut's own first 14 mission days, not only textbook limits, so drift is caught early.
- **Daily check-in routine** — heart rate, blood pressure, SpO₂, temperature, glucose, exercise, mood and sleep, with how to measure each in space.
- **"Do I need the flight surgeon?"** — a four-level answer that accounts for the communication delay, plus an auto-written note for Mission Control.
- **Emergency guides (11)** — triage questions, one step per screen, timers, a CPR rhythm, measurements, a time-stamped event log sent to Earth, and automatic links from urgent readings.
- **Voice cues** — key steps are spoken as short emphasised phrases (e.g. "Start CPR now! Push hard and fast!"). Not a chatbot.
- **Hands-free** — say "Next step" to advance when your hands are busy; also "Yes", "No", "Back", "Repeat". Every voice command is written to the log.
- **Crewmate mode** — guides are reworded when one crew member helps another.
- **Mission environments** — ISS, Gateway, Moon base, lunar rover, Mars transit, Mars base, each with its own delay, radiation and gravity.
- **Gamification** — streaks, XP and badges reward doing the routine, never the numbers themselves.
- **English / 한국어** interface.

## How to run

Use the GitHub Pages link, or serve the folder locally (`python -m http.server 8000`, then open `http://localhost:8000`). No build step.

- Keep `index.html`, `voice.js` and the `vendor/` folder together.
- **Offline:** everything works without the internet when the page is served (GitHub Pages after it has loaded, or localhost). three.js r160 is bundled in `vendor/three/` (MIT); hands-free voice commands run on the device with Vosk (`vendor/vosk/`, Apache-2.0, English command words; the 41 MB model loads the first time hands-free is turned on). Web fonts fall back to system fonts.
- Opening `index.html` by double-click also works, but browsers block local module files there, so the 3D body then loads three.js from the jsDelivr CDN (internet needed for 3D only).
- Hands-free voice commands need microphone permission, so serve the page over **https** (GitHub Pages) or localhost. If the offline engine cannot load, the app falls back to the browser's Web Speech API (Chrome or Edge, network needed).
- If the 3D body cannot load, every other feature still works.

## NASA data and resources

Orbit Guide uses the NASA Human Research Program resources listed for this challenge:

- **5 Hazards of Human Spaceflight** — every body system and emergency guide is tagged with the hazard it relates to (radiation, isolation and confinement, distance from Earth, gravity fields, hostile closed environment).
- **Risks of Human Spaceflight** — each system and guide links the matching HRP risk page.
- **Ongoing HRP Research** — background for the daily measurement routine (Standard Measures) and wearable/remote monitoring.

Simulated ranges are planned to be calibrated with NASA OSDR Inspiration4 / SOMA clinical panels. Individual astronaut medical records are not public and were not used.

## AI use

AI tools (Claude by Anthropic) were used to help draft code, plain-language text, Korean translation and documentation. The team reviewed, tested and edited the output and is responsible for the content.
<!-- Edit this section to match exactly how your team used AI. -->

## Team

Temp0.7 — three members, roles shared.

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
- [NASA-STD-3001 Technical Brief: Radiation Protection (solar particle event limit 250 mSv)](https://www.nasa.gov/ochmo/human-spaceflight-and-aviation-standards/) — NASA OCHMO
- [Venous Haemostasis (NASA and ESA study; related risk: venous thromboembolism during spaceflight)](https://www.nasa.gov/reference/venous-haemostasis/) — NASA / ESA
- [Panic disorder: what to do during a panic attack](https://www.nhs.uk/mental-health/conditions/panic-disorder/) — NHS (UK)
- [Health and Fitness Evaluations for Long Duration Microgravity Exposure (crew examine each other monthly)](https://ntrs.nasa.gov/api/citations/20060051792/downloads/20060051792.pdf) — NASA NTRS
- [Bio-Monitor: wearable health monitoring on the ISS](https://www.asc-csa.gc.ca/eng/sciences/bio-monitor.asp) — Canadian Space Agency (partner)
- [Monitoring radiation to protect astronaut health (2026-02-26)](https://www.asc-csa.gc.ca/eng/news/articles/2026/2026-02-26-monitoring-radiation-astronaut-health.asp) — Canadian Space Agency (partner)
- [Why do we conduct science experiments in space?](https://www.asc-csa.gc.ca/eng/iss/science/why-do-we-conduct-science-experiments-in-space.asp) — Canadian Space Agency (partner)
