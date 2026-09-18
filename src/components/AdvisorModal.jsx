import { useEffect, useRef } from 'react';

export function AdvisorModal({ conversation, step, answer, replies, group, onContinue, onClose }) {
  const current = conversation[step];
  const threadRef = useRef(null);
  const advisorGreeting = group === 'ai'
    ? 'Hi! I’m Glualoc, your AI assistant. I’ll ask a few quick questions to help shape your routine.'
    : 'Hi! I’m Jennifer, your human beauty advisor. I’ll ask a few quick questions to help shape your routine.';

  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: 'smooth' });
  }, [step, replies.length]);

  return (
    <div className="experience-backdrop" role="presentation">
      <section className="experience-modal" role="dialog" aria-modal="true" aria-label="Beauty advisor conversation">
        <header className="advisor-topbar">
          <div className="advisor-heading">
            <div className="advisor-avatar" aria-hidden="true">a</div>
            <div><p className="section-label">Personal beauty advisor</p><span className="advisor-status"><i /> Online now</span></div>
          </div>
          <button className="modal-close" aria-label="Close beauty advisor" onClick={onClose}>×</button>
        </header>
        <div className="conversation-shell">
          <div className="conversation-thread" aria-live="polite" ref={threadRef}>
            <div className="chat-bubble advisor-bubble greeting-bubble">
              <span>ADVISOR</span>
              {advisorGreeting}
            </div>
            {conversation.slice(0, step).map((item, index) => (
              <div className="conversation-pair" key={item.prompt}>
                <div className="chat-bubble advisor-bubble"><span>ADVISOR</span>{item.prompt}</div>
                <div className="chat-bubble user-bubble"><span>YOU</span>{replies[index]}</div>
              </div>
            ))}
            <div className="chat-bubble advisor-bubble current-bubble"><span>ADVISOR · QUESTION 0{step + 1}</span>{current.prompt}</div>
          </div>
          <p className="modal-copy">Choose one answer to reply.</p>
          <div className="advisor-options" aria-label="Beauty advisor response options">
            {current.options.map((option) => (
              <button key={option} className={answer === option ? 'advisor-option selected' : 'advisor-option'} onClick={() => onContinue(option)}>
                {option}
              </button>
            ))}
          </div>
          <div className="modal-meta"><span><b>0{step + 1}</b> / {String(conversation.length).padStart(2, '0')} QUESTIONS</span><span>Private &amp; confidential conversation</span></div>
        </div>
      </section>
    </div>
  );
}
