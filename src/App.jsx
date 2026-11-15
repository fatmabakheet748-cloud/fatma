
import { useState } from "react";
import "./App.css";

const pages = [
  "HOME",
  "LEARNING OBJECTIVES",
  "HOW TO PLAY",
  "SPOT FAKE WEBSITES",
  "COLLECT THE CLUES",
  "WEBSITE LAB",
  "DETECTIVE CHALLENGE",
  "WHAT WOULD YOU DO?",
  "MY ACHIEVEMENTS",
  "ABOUT PROJECT"
];

const objectives = [
  ["🔍", "Identify fake websites", "Recognize suspicious signs in website addresses and pages."],
  ["🔐", "Protect personal information", "Keep passwords and private information safe."],
  ["🌐", "Check website addresses", "Learn to examine website URLs before opening them."],
  ["🛡️", "Browse safely", "Make smart decisions while exploring the internet."]
];

const instructions = [
  ["👀", "LOOK CAREFULLY", "Examine every website and notice unusual details."],
  ["🧩", "COLLECT CLUES", "Find suspicious signs such as strange links and spelling mistakes."],
  ["🎯", "CHOOSE AN ANSWER", "Select the safest answer to complete each mission."],
  ["🏆", "EARN STARS", "Answer correctly and become a Cyber Detective!"]
];

const clues = [
  ["🔗", "Suspicious URL", "A website address with strange spelling or extra symbols."],
  ["🔐", "Password request", "A suspicious website asks for your password."],
  ["✍️", "Spelling mistakes", "Many spelling mistakes may be a warning sign."],
  ["🎁", "Unbelievable prizes", "Amazing prizes may be used to trick visitors."]
];

// PAGE 4: FAKE PRACTICE WEBSITES ONLY
const fakeSites = [
  {
    id: "prize",
    type: "fake",
    icon: "🎁",
    name: "FREE PRIZE NOW",
    url: "www.fr33-prize-win.example",
    description: "This practice website promises a free phone and asks for your password.",
    category: "Training example",
    clue: "An unbelievable prize and a password request are warning signs."
  },
  {
    id: "alert",
    type: "fake",
    icon: "⚠️",
    name: "URGENT ACCOUNT ALERT",
    url: "www.account-alert.example",
    description: "This practice website says your account will close unless you share your details.",
    category: "Training example",
    clue: "Urgent threats are often used to pressure people into sharing private information."
  },
  {
    id: "gift",
    type: "fake",
    icon: "🏆",
    name: "YOU WON A TABLET",
    url: "www.free-tablet-gift.example",
    description: "A fictional page claims you won a tablet and asks for personal information.",
    category: "Training example",
    clue: "Unexpected prizes and requests for personal information are suspicious."
  }
];

// PAGE 6: REAL WEBSITES + ONE SEPARATE FAKE PRACTICE WEBSITE
const labSites = [
  {
    id: "code",
    type: "real",
    icon: "💻",
    name: "Code.org",
    url: "https://code.org/",
    description: "Discover coding activities and computer science.",
    category: "Learning website",
    clue: "This is the official Code.org website. The address is code.org."
  },
  {
    id: "national",
    type: "real",
    icon: "🌍",
    name: "National Geographic Kids",
    url: "https://kids.nationalgeographic.com/",
    description: "Explore animals, nature, science, and geography.",
    category: "Educational website",
    clue: "This is the official National Geographic Kids website."
  },
  {
    id: "lab-fake",
    type: "fake",
    icon: "🎮",
    name: "FREE GAME UNLOCK",
    url: "www.free-game-unlock.example",
    description: "This fictional website promises a free game but asks visitors to enter their personal details.",
    category: "Training example",
    clue: "A free offer that asks for private information is a warning sign."
  }
];

const questions = [
  {
    q: "A website promises you a free phone if you enter your password. What should you do?",
    answers: ["Enter my password", "Close the website", "Share it with friends"],
    correct: 1,
    why: "Correct! Never share your password to claim a prize.",
    wrongFeedback: [
      "This is unsafe! A real website should never ask for your password in exchange for a prize. Close the website and keep your password private.",
      "",
      "Sharing the link may put your friends at risk too. Do not spread suspicious links. Close the website and tell a trusted adult."
    ]
  },
  {
    q: "What should you check before opening a website?",
    answers: ["The website address", "The background color", "The number of pictures"],
    correct: 0,
    why: "Great! Checking the URL can help you identify suspicious websites.",
    wrongFeedback: [
      "",
      "The background color does not prove that a website is safe. Always check the website address carefully.",
      "The number of pictures does not tell you whether a website is genuine. Check its address and make sure it is official."
    ]
  },
  {
    q: "A strange link arrives from an unknown person. What is the safest choice?",
    answers: ["Click it quickly", "Send it to everyone", "Do not open it and ask an adult"],
    correct: 2,
    why: "Excellent! Avoid unknown links and ask a trusted adult for help.",
    wrongFeedback: [
      "Be careful! Unknown links may lead to fake or harmful websites. Do not click them. Ask a trusted adult for help.",
      "Sending an unknown link to others may put them in danger too. Never share suspicious links.",
      ""
    ]
  }
];

const scenarios = [
  {
    icon: "📩",
    title: "A strange message",
    text: "You receive a message saying you have won a prize. It asks you to click a link.",
    choices: ["Click the link", "Ignore it and tell a trusted adult", "Enter my password"],
    correct: 1,
    feedback: "Smart decision! Never trust unexpected prize messages.",
    wrongFeedback: [
      "This message may be a trick. Unexpected prizes can be used to make you click dangerous links. Ignore it and tell a trusted adult.",
      "",
      "Never enter your password to claim a prize. Keep your personal information private."
    ]
  },
  {
    icon: "🔑",
    title: "A password request",
    text: "A website asks you to enter your school account password to play a game.",
    choices: ["Enter the password", "Use my friend's password", "Stop and ask a trusted adult"],
    correct: 2,
    feedback: "Well done! Keep passwords private and ask for help.",
    wrongFeedback: [
      "Do not enter your school password on an unfamiliar website. Stop and ask a trusted adult first.",
      "Using a friend's password is not safe either. Passwords must stay private. Ask a trusted adult for help.",
      ""
    ]
  }
];

function playSound(type, enabled) {
  if (!enabled) return;

  try {
    const AudioClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioClass) return;

    const ctx = new AudioClass();
    const now = ctx.currentTime;

    function tone(freq, start, duration, volume = 0.08) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.001, now + start);
      gain.gain.exponentialRampToValueAtTime(volume, now + start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + start + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + start);
      osc.stop(now + start + duration + 0.03);
    }

    function clap(start) {
      const length = Math.floor(ctx.sampleRate * 0.13);
      const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 3);
      }

      const source = ctx.createBufferSource();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      source.buffer = buffer;
      filter.type = "highpass";
      filter.frequency.value = 850;
      gain.gain.setValueAtTime(0.3, now + start);
      gain.gain.exponentialRampToValueAtTime(0.001, now + start + 0.13);

      source.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      source.start(now + start);
      source.stop(now + start + 0.14);
    }

    if (type === "applause" || type === "win") {
      for (let i = 0; i < 18; i++) {
        clap(i * 0.1);
      }

      [523, 659, 784, 1047].forEach((freq, i) => {
        tone(freq, 0.15 + i * 0.13, 0.25, 0.07);
      });
    } else if (type === "wrong") {
      tone(230, 0, 0.18);
      tone(165, 0.2, 0.22);
    } else if (type === "collect") {
      [660, 880, 1100].forEach((freq, i) => {
        tone(freq, i * 0.11, 0.17);
      });
    } else {
      tone(520, 0, 0.1, 0.06);
    }

    window.setTimeout(() => {
      if (ctx.state !== "closed") ctx.close();
    }, 3000);
  } catch (error) {
    console.warn("Sound unavailable:", error);
  }
}

function App() {
  const [page, setPage] = useState(0);
  const [sound, setSound] = useState(true);
  const [stars, setStars] = useState(0);

  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("");

  const [selectedObjective, setSelectedObjective] = useState(null);
  const [selectedInstruction, setSelectedInstruction] = useState(null);
  const [selectedClue, setSelectedClue] = useState(null);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [questionAnswered, setQuestionAnswered] = useState(false);
  const [scenarioAnswered, setScenarioAnswered] = useState(false);

  const [completed, setCompleted] = useState([]);
  const [collected, setCollected] = useState([]);
  const [siteAnswers, setSiteAnswers] = useState({});
  const [activeSite, setActiveSite] = useState(null);

  const [spotSiteIndex, setSpotSiteIndex] = useState(0);
  const [labSiteIndex, setLabSiteIndex] = useState(0);

  function showFeedback(message, type = "info") {
    setFeedback(message);
    setFeedbackType(type);

    playSound(
      type === "success" ? "applause" :
      type === "error" ? "wrong" : "click",
      sound
    );
  }

  function changePage(next) {
    if (next < 0 || next >= pages.length) return;

    setPage(next);
    setFeedback("");
    setFeedbackType("");
    setActiveSite(null);
    playSound("click", sound);
  }

  function markCompleted(key) {
    setCompleted(old => old.includes(key) ? old : [...old, key]);
  }

  function viewSite(site) {
    setActiveSite(site);
    setFeedback("");
    setFeedbackType("");
    playSound("click", sound);
  }

  function closeSite() {
    setActiveSite(null);
    setFeedback("");
    setFeedbackType("");
    playSound("click", sound);
  }

  function nextWebsite(mode) {
    setActiveSite(null);
    setFeedback("");
    setFeedbackType("");

    if (mode === "spot") {
      if (spotSiteIndex < fakeSites.length - 1) {
        setSpotSiteIndex(old => old + 1);
        playSound("collect", sound);
      } else {
        changePage(4);
      }
      return;
    }

    if (mode === "lab") {
      if (labSiteIndex < labSites.length - 1) {
        setLabSiteIndex(old => old + 1);
        playSound("collect", sound);
      } else {
        changePage(6);
      }
    }
  }

  function answerSite(site, answer) {
    const correctAnswer = site.type === "real" ? "real" : "fake";

    if (answer === correctAnswer) {
      if (siteAnswers[site.id] !== "correct") {
        setSiteAnswers(old => ({ ...old, [site.id]: "correct" }));
        setStars(old => old + 1);
      }

      showFeedback(
        site.type === "real"
          ? "Excellent! This is a real educational website. Its official address is an important clue."
          : "Excellent detective! This is a fake website. The suspicious offer or request for private information is a warning sign.",
        "success"
      );

      const updatedAnswers = {
        ...siteAnswers,
        [site.id]: "correct"
      };

      const allTrainingSites = [...fakeSites, ...labSites];

      if (allTrainingSites.every(item => updatedAnswers[item.id] === "correct")) {
        markCompleted("websites");
      }
    } else {
      showFeedback(
        site.type === "real"
          ? "Not quite! This is a real educational website. Its official address belongs to the genuine organization. Check the name and URL again."
          : "Not quite! This is a fake practice website. Look for warning signs such as unbelievable prizes, strange addresses, or requests for passwords.",
        "error"
      );
    }
  }

  function answerQuestion(answer) {
    if (questionAnswered) return;

    const current = questions[questionIndex];

    if (answer === current.correct) {
      setQuestionAnswered(true);
      setStars(old => old + 1);
      showFeedback(current.why, "success");

      if (questionIndex === questions.length - 1) {
        markCompleted("challenge");
      }
    } else {
      showFeedback(current.wrongFeedback[answer], "error");
    }
  }

  function nextQuestion() {
    if (!questionAnswered) return;

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(old => old + 1);
      setQuestionAnswered(false);
      setFeedback("");
      setFeedbackType("");
    } else {
      showFeedback("Amazing! You completed the Detective Challenge!", "success");
    }
  }

  function answerScenario(answer) {
    if (scenarioAnswered) return;

    const current = scenarios[scenarioIndex];

    if (answer === current.correct) {
      setScenarioAnswered(true);
      setStars(old => old + 1);
      showFeedback(current.feedback, "success");

      if (scenarioIndex === scenarios.length - 1) {
        markCompleted("scenarios");
      }
    } else {
      showFeedback(current.wrongFeedback[answer], "error");
    }
  }

  function nextScenario() {
    if (!scenarioAnswered) return;

    if (scenarioIndex < scenarios.length - 1) {
      setScenarioIndex(old => old + 1);
      setScenarioAnswered(false);
      setFeedback("");
      setFeedbackType("");
    } else {
      showFeedback("Great work! You completed all safety situations!", "success");
    }
  }

  function card(icon, title, subtitle, onClick, active = false) {
    return (
      <button
        className={`game-card ${active ? "selected" : ""}`}
        onClick={onClick}
      >
        <span className="card-icon">{icon}</span>
        <strong>{title}</strong>
        <small>{subtitle}</small>
        <span className="card-arrow">✦</span>
      </button>
    );
  }

  function renderSiteCard(site) {
    const result = siteAnswers[site.id];

    return (
      <div className="website-card" key={site.id}>
        <div className="website-icon">{site.icon}</div>

        <div className="website-info">
          <strong>{site.name}</strong>
          <small>{site.url}</small>
          <small>{site.category}</small>
        </div>

        <div className="website-actions">
          <button onClick={() => viewSite(site)}>VIEW</button>
          <button onClick={() => answerSite(site, "real")}>REAL</button>
          <button onClick={() => answerSite(site, "fake")}>FAKE</button>
        </div>

        {result === "correct" && (
          <span className="answer-mark good">✓</span>
        )}
      </div>
    );
  }

  function renderSiteViewer() {
    if (!activeSite) return null;

    const isCorrect = siteAnswers[activeSite.id] === "correct";
    const isSpotPage = page === 3;
    const isLabPage = page === 5;

    return (
      <div className="site-viewer">
        <div className="site-viewer-bar">
          <span>
            {activeSite.type === "real"
              ? "🌐 REAL WEBSITE PREVIEW"
              : "🔒 DETECTIVE PRACTICE MODE"}
          </span>
          <button onClick={closeSite}>← BACK TO GAME</button>
        </div>

        {activeSite.type === "fake" ? (
          <div className="fake-browser">
            <div className="fake-browser-top">
              ● ● ● <span>Practice website preview</span>
            </div>

            <div className="fake-warning">⚠️ SIMULATED FAKE WEBSITE</div>

            <div className="fake-content">
              <div className="fake-big-icon">{activeSite.icon}</div>
              <h2>{activeSite.name}</h2>
              <p className="fake-address">{activeSite.url}</p>
              <h3>CONGRATULATIONS!</h3>
              <p>{activeSite.description}</p>

              <div className="fake-password">
                <label>Enter your password:</label>
                <input
                  type="password"
                  placeholder="Never enter your real password"
                  disabled
                />
                <button disabled>CLAIM YOUR PRIZE</button>
              </div>

              <div className="fake-explanation">
                <b>🔎 Detective clue</b>
                <p>{activeSite.clue}</p>
                <p>This is only a fictional training example. Nothing is collected or sent.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="embedded-site-info">
            <div className="embedded-site-heading">
              <span>{activeSite.icon}</span>
              <div>
                <h2>{activeSite.name}</h2>
                <p>{activeSite.description}</p>
              </div>
            </div>

            <div className="embedded-address">
              <span>🔒</span>
              <span>{activeSite.url}</span>
            </div>

            <iframe
              className="website-frame"
              src={activeSite.url}
              title={activeSite.name}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />

            <p className="iframe-note">
              If the website does not appear, its security settings may block
              embedded viewing. You can return to the game using BACK TO GAME.
            </p>
          </div>
        )}

        <div className="detail-panel">
          <b>🔎 YOUR DETECTIVE DECISION</b>
          <p>Is this website REAL or FAKE?</p>
          <div className="website-actions">
            <button onClick={() => answerSite(activeSite, "real")}>REAL</button>
            <button onClick={() => answerSite(activeSite, "fake")}>FAKE</button>
          </div>
        </div>

        {feedback && (
          <div className={`feedback-box ${feedbackType}`}>
            <span>
              {feedbackType === "success" ? "🎉" :
               feedbackType === "error" ? "⚠️" : "💡"}
            </span>
            <p>{feedback}</p>
            <button
              onClick={() => {
                setFeedback("");
                setFeedbackType("");
              }}
            >
              ✕
            </button>
          </div>
        )}

        {isCorrect && (isSpotPage || isLabPage) && (
          <button
            className="main-button"
            onClick={() => nextWebsite(isSpotPage ? "spot" : "lab")}
          >
            NEXT WEBSITE ➜
          </button>
        )}
      </div>
    );
  }

  function renderPage() {
    if (activeSite) return renderSiteViewer();

    switch (page) {
      case 0:
        return (
          <>
            <div className="mission-tag">⭐ YOUR NEW MISSION ⭐</div>
            <h1>Cyber Detective Kids</h1>
            <h2 className="lesson-title">Dealing with Fake Websites</h2>
            <div className="grade-label">🎓 GRADE 5 – PRIMARY SCHOOL</div>
            <p className="lead">
              Are you ready to discover the secrets of fake websites?
            </p>
            <div className="hero-illustration">
              <span>🔎</span><span>🌐</span><span>🛡️</span>
            </div>
            <div className="home-message">
              <strong>YOUR MISSION</strong>
              <p>
                Explore websites, collect clues, solve challenges, and learn
                how to stay safe online!
              </p>
            </div>
            <button className="main-button" onClick={() => changePage(1)}>
              START THE MISSION 🚀
            </button>
          </>
        );

      case 1:
        return (
          <>
            <h1>🎯 Learning Objectives</h1>
            <p className="lead">Choose a mission card to discover what you will learn.</p>
            <div className="card-grid">
              {objectives.map((item, i) =>
                card(item[0], item[1], "TAP TO EXPLORE", () => {
                  setSelectedObjective(i);
                  showFeedback(item[2]);
                }, selectedObjective === i)
              )}
            </div>
            {selectedObjective !== null && (
              <div className="detail-panel">
                <b>{objectives[selectedObjective][1]}</b>
                <p>{objectives[selectedObjective][2]}</p>
              </div>
            )}
          </>
        );

      case 2:
        return (
          <>
            <h1>🎮 How to Play</h1>
            <p className="lead">Learn the detective rules before starting your adventure.</p>
            <div className="card-grid">
              {instructions.map((item, i) =>
                card(item[0], item[1], "TAP FOR INSTRUCTIONS", () => {
                  setSelectedInstruction(i);
                  showFeedback(item[2]);
                }, selectedInstruction === i)
              )}
            </div>
            {selectedInstruction !== null && (
              <div className="detail-panel">
                <b>{instructions[selectedInstruction][1]}</b>
                <p>{instructions[selectedInstruction][2]}</p>
              </div>
            )}
          </>
        );

      // PAGE 4: FAKE WEBSITES ONLY
      case 3: {
        const currentSite = fakeSites[spotSiteIndex];
        const isCorrect = siteAnswers[currentSite.id] === "correct";

        return (
          <>
            <h1>🌐 Spot Fake Websites</h1>
            <p className="lead">
              Explore each fictional website, then decide if it is REAL or FAKE.
            </p>

            <div className="question-progress">
              WEBSITE {spotSiteIndex + 1} / {fakeSites.length}
            </div>

            <div className="website-list">
              {renderSiteCard(currentSite)}
            </div>

            <div className="detail-panel">
              <b>Detective tip</b>
              <p>
                These are fictional practice websites. Look for suspicious
                prizes, unusual addresses, and requests for private information.
              </p>
              <p>
                Correctly identified: {
                  fakeSites.filter(site => siteAnswers[site.id] === "correct").length
                } / {fakeSites.length}
              </p>
            </div>

            {isCorrect && (
              <button
                className="main-button"
                onClick={() => nextWebsite("spot")}
              >
                {spotSiteIndex === fakeSites.length - 1
                  ? "NEXT PAGE ➜"
                  : "NEXT WEBSITE ➜"}
              </button>
            )}
          </>
        );
      }

      case 4:
        return (
          <>
            <h1>🧩 Collect the Clues</h1>
            <p className="lead">Tap each clue to add it to your detective notebook.</p>
            <div className="card-grid">
              {clues.map((item, i) =>
                card(
                  item[0],
                  item[1],
                  collected.includes("clue" + i) ? "COLLECTED ✓" : "COLLECT CLUE",
                  () => {
                    setSelectedClue(i);

                    if (!collected.includes("clue" + i)) {
                      setCollected(old => [...old, "clue" + i]);
                      setStars(old => old + 1);
                      playSound("collect", sound);
                    }

                    showFeedback(item[2], "success");
                    markCompleted("clues");
                  },
                  selectedClue === i
                )
              )}
            </div>

            {selectedClue !== null && (
              <div className="detail-panel">
                <b>{clues[selectedClue][1]}</b>
                <p>{clues[selectedClue][2]}</p>
              </div>
            )}

            <div className="progress-note">
              Clues collected: {collected.length} / 4
            </div>
          </>
        );

      // PAGE 6: REAL WEBSITES + ONE FAKE PRACTICE WEBSITE
      case 5: {
        const currentSite = labSites[labSiteIndex];
        const isCorrect = siteAnswers[currentSite.id] === "correct";

        return (
          <>
            <h1>🧪 Website Lab</h1>
            <p className="lead">
              Explore real and practice websites inside the game screen.
            </p>

            <div className="question-progress">
              WEBSITE {labSiteIndex + 1} / {labSites.length}
            </div>

            <div className="lab-grid">
              <div className="lab-card" key={currentSite.id}>
                <div className="lab-window">
                  <span>● ● ●</span>
                  <b>{currentSite.icon} {currentSite.name}</b>
                  <small>{currentSite.url}</small>
                </div>

                <p>{currentSite.description}</p>
                <p className="site-category">{currentSite.category}</p>

                <div className="lab-actions">
                  <button onClick={() => viewSite(currentSite)}>
                    VIEW INSIDE THE GAME
                  </button>
                  <button onClick={() => answerSite(currentSite, "real")}>
                    REAL
                  </button>
                  <button onClick={() => answerSite(currentSite, "fake")}>
                    FAKE
                  </button>
                </div>
              </div>
            </div>

            <div className="detail-panel">
              <b>🔐 Safety reminder</b>
              <p>
                Always check the address carefully. A familiar name does not
                guarantee that every similar-looking link is genuine.
              </p>
              <p>
                This lab includes two real educational websites and one
                fictional training website.
              </p>
            </div>

            {isCorrect && (
              <button
                className="main-button"
                onClick={() => nextWebsite("lab")}
              >
                {labSiteIndex === labSites.length - 1
                  ? "NEXT PAGE ➜"
                  : "NEXT WEBSITE ➜"}
              </button>
            )}
          </>
        );
      }

      case 6: {
        const q = questions[questionIndex];

        return (
          <>
            <h1>🕵️ Detective Challenge</h1>
            <p className="lead">Solve each question to unlock the next challenge!</p>

            <div className="question-progress">
              QUESTION {questionIndex + 1} / {questions.length}
            </div>

            <div className="question-box">
              <span className="question-icon">❔</span>
              <h2>{q.q}</h2>
            </div>

            <div className="answer-list">
              {q.answers.map((answer, i) => (
                <button
                  key={answer}
                  className="answer-button"
                  disabled={questionAnswered}
                  onClick={() => answerQuestion(i)}
                >
                  <span>{String.fromCharCode(65 + i)}</span>
                  {answer}
                </button>
              ))}
            </div>

            {questionAnswered && (
              <button className="main-button" onClick={nextQuestion}>
                {questionIndex === questions.length - 1
                  ? "FINISH CHALLENGE 🏆"
                  : "NEXT QUESTION ➜"}
              </button>
            )}
          </>
        );
      }

      case 7: {
        const s = scenarios[scenarioIndex];

        return (
          <>
            <h1>💡 What Would You Do?</h1>
            <p className="lead">
              Real-life situations need smart and safe decisions.
            </p>

            <div className="question-progress">
              SITUATION {scenarioIndex + 1} / {scenarios.length}
            </div>

            <div className="scenario-box">
              <span>{s.icon}</span>
              <h2>{s.title}</h2>
              <p>{s.text}</p>
            </div>

            <div className="answer-list">
              {s.choices.map((choice, i) => (
                <button
                  key={choice}
                  className="answer-button"
                  disabled={scenarioAnswered}
                  onClick={() => answerScenario(i)}
                >
                  <span>{i + 1}</span>
                  {choice}
                </button>
              ))}
            </div>

            {scenarioAnswered && (
              <button className="main-button" onClick={nextScenario}>
                {scenarioIndex === scenarios.length - 1
                  ? "FINISH SITUATIONS 🏆"
                  : "NEXT SITUATION ➜"}
              </button>
            )}
          </>
        );
      }

      // PAGE 9: MY ACHIEVEMENTS
      case 8:
        return (
          <>
            <h1>🏆 My Achievements</h1>
            <p className="lead">
              Look at what you have achieved on your detective journey!
            </p>

            <div className="achievement-score">
              <span>⭐</span>
              <strong>{stars}</strong>
              <small>STARS EARNED</small>
            </div>

            <div className="card-grid">
              {[
                ["🔎", "Website Explorer", completed.includes("websites")],
                ["🧩", "Clue Collector", completed.includes("clues")],
                ["🎯", "Challenge Master", completed.includes("challenge")],
                ["🛡️", "Safety Champion", completed.includes("scenarios")]
              ].map(([icon, title, done]) => (
                <div
                  className={`achievement-card ${done ? "unlocked" : ""}`}
                  key={title}
                >
                  <span>{icon}</span>
                  <b>{title}</b>
                  <small>{done ? "UNLOCKED ✓" : "KEEP PLAYING"}</small>
                </div>
              ))}
            </div>

            <button
              className="main-button"
              onClick={() => {
                showFeedback(
                  "Congratulations! Keep being safe online!",
                  "success"
                );
              }}
            >
              CELEBRATE MY SUCCESS 🎉
            </button>

            <button
              className="main-button"
              onClick={() => changePage(9)}
            >
              NEXT: ABOUT PROJECT ➜
            </button>
          </>
        );

      default:
        return (
          <>
            <h1>ℹ️ About Project</h1>
            <p className="lead">
              Cyber Detective Kids – Dealing with Fake Websites
            </p>

            <div className="about-card">
              <span>🎓</span>
              <h2>Educational Information</h2>
              <p><b>Grade:</b> 5th Primary School</p>
              <p><b>Subject:</b> Digital Safety</p>
              <p><b>Prepared by:</b> Fatma El-Zahraa Bakhit</p>
              <p><b>Supervised by:</b> Dr. Nermin Nasr</p>
              <p><b>Supervisor:</b> Dr. Hossam Hamdy</p>
            </div>

            <div className="thank-you">THANK YOU, DETECTIVE! 🌟</div>
          </>
        );
    }
  }

  return (
    <div className="app-shell">
      <div className="background-grid" />

      <header className="topbar">
        <div className="brand">
          <span className="brand-icon">🔎</span>
          <div>
            <b>Cyber</b>
            <strong>Detective Kids</strong>
          </div>
        </div>

        <div className="top-progress">
          <span>⭐</span>
          <div>
            <b>PAGE {page + 1} OF 10</b>
            <div className="progress-track">
              <i style={{ width: `${(page + 1) * 10}%` }} />
            </div>
          </div>
        </div>

        <div className="score-box">
          <span>🏅</span>
          <div>
            <small>DETECTIVE SCORE</small>
            <b>{stars} STARS</b>
          </div>
        </div>

        <button
          className="sound-button"
          onClick={() => setSound(old => !old)}
          title="Sound on or off"
        >
          {sound ? "🔊" : "🔇"}
        </button>
      </header>

      <main className="game-stage">
        <aside className="character detective">
          <div className="character-glow" />
          <div className="character-emoji">🕵️‍♀️</div>
          <div className="character-label">THE DETECTIVE</div>
          <div className="speech-bubble">Let's solve the mystery!</div>
        </aside>

        <section className="main-screen">
          <div className="screen-topline">
            <span>● LIVE MISSION</span>
            <span>CYBER LAB // 2026</span>
          </div>

          <div className="screen-content">
            {renderPage()}
          </div>

          {feedback && !activeSite && (
            <div className={`feedback-box ${feedbackType}`}>
              <span>
                {feedbackType === "success" ? "🎉" :
                 feedbackType === "error" ? "⚠️" : "💡"}
              </span>
              <p>{feedback}</p>
              <button
                onClick={() => {
                  setFeedback("");
                  setFeedbackType("");
                }}
              >
                ✕
              </button>
            </div>
          )}
        </section>

        <aside className="character robot">
          <div className="robot-glow" />
          <div className="robot-emoji">🤖</div>
          <div className="character-label">ROBO HELPER</div>
          <div className="speech-bubble">You can do it, hero!</div>
        </aside>
      </main>

      <nav className="bottom-nav">
        <button
          className="nav-prev"
          onClick={() => changePage(page - 1)}
          disabled={page === 0 || !!activeSite}
        >
          ❮ PREVIOUS
        </button>

        <div className="page-dots">
          {pages.map((name, i) => (
            <button
              key={name}
              className={page === i && !activeSite ? "active" : ""}
              onClick={() => changePage(i)}
              title={name}
              disabled={!!activeSite}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          className="nav-next"
          onClick={() => changePage(page + 1)}
          disabled={page === 9 || !!activeSite}
        >
          NEXT ❯
        </button>
      </nav>

      <footer className="footer-line">
        🔐 STAY SMART • STAY SAFE • BE A CYBER DETECTIVE 🔐
      </footer>
    </div>
  );
}

export default App;
