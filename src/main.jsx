import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Logo } from './components/Logo';
import Survey from './components/Survey';

import './styles.css';

function App() {
  return (
    <main className="page-shell">
      <header className="site-header"><Logo /><div className="header-note"><span className="live-dot" /> Pop-up learning lab <span className="slash">/</span> 01</div><button className="menu-button" aria-label="Open menu"><span /><span /></button></header>
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <div className="content-grid">
        <div className="intro"><p className="kicker">A moment before we begin</p><h1>Make space<br /><em>for what’s next.</em></h1><p className="intro-copy">A few quick questions help us understand your experience — before and after you step through the door.</p><div className="time-note"><span className="clock">◷</span><strong>2 min</strong> to complete <span className="tiny-line" /></div></div>
        <Survey />
      </div>
      <footer className="site-footer"><span>OPEN DOOR / FIELD NOTES</span><span>Designed for curious people <span className="heart">♥</span></span><span>Scroll to explore <b>↓</b></span></footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>);
