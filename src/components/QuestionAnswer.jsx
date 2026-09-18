export function QuestionAnswer({ question, value, onChange, onChoose, error }) {
  if (question.type === 'choice') {
    return (
      <div className="options" role="radiogroup" aria-label={question.title}>
        {question.options.map((option, index) => (
          <button key={option} className={value === option ? 'option selected' : 'option'} onClick={() => onChoose(option)} role="radio" aria-checked={value === option}>
            <span className="option-number">0{index + 1}</span>
            <span>{option}</span>
            <span className="check">{value === option ? '✓' : '↗'}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <label className="text-answer">
      <span className="sr-only">{question.title}</span>
      <input type={question.type} value={value || ''} onChange={(event) => onChange(event.target.value)} placeholder={question.placeholder} required={question.required} autoComplete={question.id} inputMode={question.type === 'tel' ? 'tel' : undefined} aria-invalid={Boolean(error)} aria-describedby={error ? `${question.id}-error` : undefined} />
      {error && <span className="field-error" id={`${question.id}-error`}>{error}</span>}
    </label>
  );
}
