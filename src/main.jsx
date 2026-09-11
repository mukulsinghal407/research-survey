import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const preQuestions = [
  {
    id: 'expectation',
    eyebrow: '01 / 03',
    title: 'What are you hoping to take away today?',
    hint: 'Choose the one that feels closest.',
    options: ['A fresh perspective', 'A practical new skill', 'A chance to connect', 'I am just curious'],
  },
  {
    id: 'familiarity',
    eyebrow: '02 / 03',
    title: 'How familiar are you with this topic?',
    hint: 'There is no wrong answer.',
    options: ['Brand new to me', 'I know a little', 'Fairly comfortable', 'I could teach it'],
  },
  {
    id: 'intention',
    eyebrow: '03 / 03',
    title: 'How are you arriving into this experience?',
    hint: 'Pick the mood that fits best.',
    options: ['Energised', 'Open-minded', 'A little unsure', 'In need of inspiration'],
  },
];

const postQuestions = [
  {
    id: 'value',
    eyebrow: '01 / 03',
    title: 'How valuable was this experience for you?',
    hint: 'Think about the last hour.',
    options: ['Not yet', 'A little', 'Quite a lot', 'A great deal'],
  },
  {
    id: 'confidence',
    eyebrow: '02 / 03',
    title: 'How confident do you feel using what you learned?',
    hint: 'Your honest answer helps us improve.',
    options: ['Not confident yet', 'I need more practice', 'Mostly confident', 'Ready to try it'],
  },
  {
    id: 'return',
    eyebrow: '03 / 03',
    title: 'What should we make room for next time?',
    hint: 'Choose what would bring you back.',
    options: ['More time to practise', 'More conversation', 'A deeper dive', 'A new surprise'],
  },
];

const advisorConversation = [
  {
    prompt: 'Welcome! Let’s find the right routine for you. What is your skin type?',
    options: ['Dry', 'Oily', 'Combination', 'Sensitive / reactive'],
  },
  {
    prompt: 'Thanks! What would you most like to improve?',
    options: ['Hydration and glow', 'Breakouts and congestion', 'Uneven tone or dark spots', 'Fine lines and firmness'],
  },
  {
    prompt: 'How would you like your routine to feel?',
    options: ['Simple and quick', 'A calming self-care ritual', 'Targeted and effective', 'I am not sure yet'],
  },
];

function Logo() {
  return (
    <a className="logo" href="/" aria-label="Open Door home">
      <span className="logo-mark" aria-hidden="true">
        <span />
        <span />
      </span>
      <span>open door</span>
    </a>
  );
}

function Progress({ activeTab, step, total }) {
  const progress = ((step + 1) / total) * 100;
  return (
    <div className="progress-wrap" aria-label={`Question ${step + 1} of ${total}`}>
      <div className="progress-meta">
        <span>{activeTab === 'pre' ? 'Before the experience' : 'After the experience'}</span>
        <span>{String(step + 1).padStart(2, '0')} <b>/</b> {String(total).padStart(2, '0')}</span>
      </div>
      <div className="progress-track">
        <div className="progress-value" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

function Survey() {
  const [activeTab, setActiveTab] = useState('pre');
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showExperience, setShowExperience] = useState(false);
  const [advisorStep, setAdvisorStep] = useState(0);
  const [advisorAnswer, setAdvisorAnswer] = useState('');
  const [advisorReplies, setAdvisorReplies] = useState([]);
  const questions = activeTab === 'pre' ? preQuestions : postQuestions;
  const current = questions[step];
  const selected = answers[`${activeTab}-${current.id}`];

  const selectTab = (tab) => {
    setActiveTab(tab);
    setStep(0);
  };

  const choose = (option) => {
    setAnswers((previous) => ({ ...previous, [`${activeTab}-${current.id}`]: option }));
  };

  const next = () => {
    if (step < questions.length - 1) {
      setStep((value) => value + 1);
    } else if (activeTab === 'pre') {
      setAdvisorStep(0);
      setAdvisorAnswer('');
      setAdvisorReplies([]);
      setShowExperience(true);
    } else {
      setSubmitted(true);
    }
  };

  const chooseAdvisorAnswer = (option) => {
    setAdvisorAnswer(option);
  };

  const continueAdvisor = () => {
    if (!advisorAnswer) return;
    setAdvisorReplies((previous) => [...previous, advisorAnswer]);
    if (advisorStep < advisorConversation.length - 1) {
      setAdvisorStep((value) => value + 1);
      setAdvisorAnswer('');
      return;
    }
    setShowExperience(false);
    setActiveTab('post');
    setStep(0);
  };

  if (submitted) {
    return (
      <section className="survey-card success-card" aria-live="polite">
        <div className="success-icon">✦</div>
        <p className="section-label">All done</p>
        <h2>Thanks for leaving a little door open.</h2>
        <p className="success-copy">Your thoughts help us make the next pop-up even more meaningful.</p>
        <button className="button button-dark" onClick={() => { setSubmitted(false); setShowExperience(false); setActiveTab('pre'); setStep(0); }}>
          Start again <span>↗</span>
        </button>
      </section>
    );
  }

  return (
    <>
      <section className="survey-card">
      <div className="survey-tabs" role="tablist" aria-label="Survey stage">
        <button className={activeTab === 'pre' ? 'tab active' : 'tab'} onClick={() => selectTab('pre')} role="tab" aria-selected={activeTab === 'pre'}>
          <span className="tab-dot" /> Before
        </button>
        <span className="tab-line" />
        <button className={activeTab === 'post' ? 'tab active' : 'tab'} onClick={() => selectTab('post')} role="tab" aria-selected={activeTab === 'post'}>
          <span className="tab-dot" /> After
        </button>
      </div>
      <Progress activeTab={activeTab} step={step} total={questions.length} />
      <div className="question">
        <p className="eyebrow">{current.eyebrow}</p>
        <h2>{current.title}</h2>
        <p className="hint">{current.hint}</p>
        <div className="options" role="radiogroup" aria-label={current.title}>
          {current.options.map((option, index) => (
            <button
              key={option}
              className={selected === option ? 'option selected' : 'option'}
              onClick={() => choose(option)}
              role="radio"
              aria-checked={selected === option}
            >
              <span className="option-number">0{index + 1}</span>
              <span>{option}</span>
              <span className="check">{selected === option ? '✓' : '↗'}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="survey-footer">
        <span className="privacy"><span className="lock">⌑</span> Your answers are private</span>
        <button className="button button-dark" disabled={!selected} onClick={next}>
          {step === questions.length - 1 ? (activeTab === 'pre' ? 'Continue to after' : 'Finish survey') : 'Next question'} <span>↗</span>
        </button>
      </div>
      </section>
      {showExperience && (
        <div className="experience-backdrop" role="presentation">
          <section className="experience-modal" role="dialog" aria-modal="true" aria-labelledby="experience-title">
            <header className="advisor-topbar">
              <div className="advisor-heading">
                <div className="advisor-avatar" aria-hidden="true">a</div>
                <div><p className="section-label">Personal beauty advisor</p><span className="advisor-status"><i /> Online now</span></div>
              </div>
              <button className="modal-close" aria-label="Close beauty advisor" onClick={() => setShowExperience(false)}>×</button>
            </header>
            <div className="conversation-shell">
              <div className="conversation-intro">
                <span className="message-label">OPEN DOOR BEAUTY / 01</span>
                <h2 id="experience-title">Let’s get to know<br /><em>your skin.</em></h2>
                <p>Answer a few questions and I’ll point you toward a routine that feels made for you.</p>
              </div>
              <div className="conversation-thread" aria-live="polite">
                {advisorConversation.slice(0, advisorStep).map((item, index) => (
                  <div className="conversation-pair" key={item.prompt}>
                    <div className="chat-bubble advisor-bubble"><span>ADVISOR</span>{item.prompt}</div>
                    <div className="chat-bubble user-bubble"><span>YOU</span>{advisorReplies[index]}</div>
                  </div>
                ))}
                <div className="chat-bubble advisor-bubble current-bubble"><span>ADVISOR · QUESTION 0{advisorStep + 1}</span>{advisorConversation[advisorStep].prompt}</div>
              </div>
              <p className="modal-copy">Choose one answer to reply.</p>
              <div className="advisor-options" role="radiogroup" aria-label="Beauty advisor response options">
                {advisorConversation[advisorStep].options.map((option, index) => (
                  <button
                    key={option}
                    className={advisorAnswer === option ? 'advisor-option selected' : 'advisor-option'}
                    onClick={() => chooseAdvisorAnswer(option)}
                    role="radio"
                    aria-checked={advisorAnswer === option}
                  >
                    <span>0{index + 1}</span>{option}<b>{advisorAnswer === option ? '✓' : '↗'}</b>
                  </button>
                ))}
              </div>
              <div className="modal-meta"><span><b>0{advisorStep + 1}</b> / 03 QUESTIONS</span><span>Private conversation</span></div>
              <button className="button button-dark modal-button" disabled={!advisorAnswer} onClick={continueAdvisor}>
                {advisorStep === advisorConversation.length - 1 ? 'See my routine' : 'Send reply'} <span>↗</span>
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <main className="page-shell">
      <header className="site-header">
        <Logo />
        <div className="header-note"><span className="live-dot" /> Pop-up learning lab <span className="slash">/</span> 01</div>
        <button className="menu-button" aria-label="Open menu"><span /><span /></button>
      </header>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="content-grid">
        <div className="intro">
          <p className="kicker">A moment before we begin</p>
          <h1>Make space<br /><em>for what’s next.</em></h1>
          <p className="intro-copy">A few quick questions help us understand your experience — before and after you step through the door.</p>
          <div className="time-note"><span className="clock">◷</span><strong>2 min</strong> to complete <span className="tiny-line" /></div>
        </div>
        <Survey />
      </div>
      <footer className="site-footer">
        <span>OPEN DOOR / FIELD NOTES</span>
        <span>Designed for curious people <span className="heart">♥</span></span>
        <span>Scroll to explore <b>↓</b></span>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode><App /></StrictMode>,
);
