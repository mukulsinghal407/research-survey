export function SuccessCard({ onRestart }) {
  return (
    <section className="survey-card success-card" aria-live="polite">
      <div className="success-icon">✦</div>
      <p className="section-label">All done</p>
      <h2>Thanks for leaving a little door open.</h2>
      <p className="success-copy">Your thoughts help us make the next pop-up even more meaningful.</p>
      <button className="button button-dark" onClick={onRestart}>Start again <span>↗</span></button>
    </section>
  );
}
