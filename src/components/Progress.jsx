export function Progress({ activeTab, step, total }) {
  const progress = ((step + 1) / total) * 100;
  return (
    <div className="progress-wrap" aria-label={`Question ${step + 1} of ${total}`}>
      <div className="progress-meta">
        <span>{activeTab === 'pre' ? 'Before the experience' : 'After the experience'}</span>
        <span>{String(step + 1).padStart(2, '0')} <b>/</b> {String(total).padStart(2, '0')}</span>
      </div>
      <div className="progress-track"><div className="progress-value" style={{ width: `${progress}%` }} /></div>
    </div>
  );
}
