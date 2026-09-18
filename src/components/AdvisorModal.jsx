export function AdvisorModal({ conversation, step, answer, replies, onChoose, onContinue, onClose }) {
  const current = conversation[step];
  return (
    <div className="experience-backdrop" role="presentation">
      <section className="experience-modal" role="dialog" aria-modal="true" aria-labelledby="experience-title">
        <header className="advisor-topbar">
          <div className="advisor-heading">
            <div className="advisor-avatar" aria-hidden="true">a</div>
            <div><p className="section-label">Personal beauty advisor</p><span className="advisor-status"><i /> Online now</span></div>
          </div>
          <button className="modal-close" aria-label="Close beauty advisor" onClick={onClose}>×</button>
        </header>
        <div className="conversation-shell">
          <div className="conversation-intro">
            <span className="message-label">OPEN DOOR BEAUTY / 01</span>
            <h2 id="experience-title">Let’s get to know<br /><em>your skin.</em></h2>
            <p>Answer a few questions and I’ll point you toward a routine that feels made for you.</p>
          </div>
          <div className="conversation-thread" aria-live="polite">
            {conversation.slice(0, step).map((item, index) => (
              <div className="conversation-pair" key={item.prompt}>
                <div className="chat-bubble advisor-bubble"><span>ADVISOR</span>{item.prompt}</div>
                <div className="chat-bubble user-bubble"><span>YOU</span>{replies[index]}</div>
              </div>
            ))}
            <div className="chat-bubble advisor-bubble current-bubble"><span>ADVISOR · QUESTION 0{step + 1}</span>{current.prompt}</div>
          </div>
          <p className="modal-copy">Choose one answer to reply.</p>
          <div className="advisor-options" role="radiogroup" aria-label="Beauty advisor response options">
            {current.options.map((option, index) => (
              <button key={option} className={answer === option ? 'advisor-option selected' : 'advisor-option'} onClick={() => onChoose(option)} role="radio" aria-checked={answer === option}>
                <span>0{index + 1}</span>{option}<b>{answer === option ? '✓' : '↗'}</b>
              </button>
            ))}
          </div>
          <div className="modal-meta"><span><b>0{step + 1}</b> / {String(conversation.length).padStart(2, '0')} QUESTIONS</span><span>Private conversation</span></div>
          <button className="button button-dark modal-button" disabled={!answer} onClick={onContinue}>{step === conversation.length - 1 ? 'See my routine' : 'Send reply'} <span>↗</span></button>
        </div>
      </section>
    </div>
  );
}
