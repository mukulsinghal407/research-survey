import { useState } from 'react';

import { Progress } from './Progress';
import { QuestionAnswer } from './QuestionAnswer';
import { SuccessCard } from './SuccessCard';
import { validateAnswer } from '../domain/surveyValidation';
import { assignExperimentGroup, createSessionId } from '../domain/experiment';
import { advisorConversation, postQuestions, preQuestions, submissionConfig } from '../surveyConfig';
import { submitSurvey } from '../services/surveyApi';
import { AdvisorModal } from './AdvisorModal';


const stages = { pre: preQuestions, post: postQuestions };

function stageAnswers(answers, stage) {
  return Object.fromEntries(Object.entries(answers)
    .filter(([key]) => key.startsWith(`${stage}-`))
    .map(([key, answer]) => [key.slice(stage.length + 1), answer]));
}

function buildSubmission({ sessionId, answers, advisorReplies, experiment }) {
  return {
    schemaVersion: 1,
    sessionId,
    participant: { preActivity: stageAnswers(answers, 'pre'), postActivity: stageAnswers(answers, 'post') },
    advisorTouchpoints: advisorConversation.map((interaction, index) => ({ prompt: interaction.prompt, response: advisorReplies[index] })),
    experiment,
    submittedAt: new Date().toISOString(),
  };
}


function SurveyTabs({ activeTab, onSelect }) {
  return (
    <div className="survey-tabs" role="tablist" aria-label="Survey stage">
      <button className={activeTab === 'pre' ? 'tab active' : 'tab'} onClick={() => onSelect('pre')} role="tab" aria-selected={activeTab === 'pre'}><span className="tab-dot" /> Before</button>
      <span className="tab-line" />
      <button className={activeTab === 'post' ? 'tab active' : 'tab'} onClick={() => onSelect('post')} role="tab" aria-selected={activeTab === 'post'}><span className="tab-dot" /> After</button>
    </div>
  );
}

export default function Survey() {
  const [sessionId] = useState(createSessionId);
  const [experiment] = useState(assignExperimentGroup);
  const [activeTab, setActiveTab] = useState('pre');
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [advisorStep, setAdvisorStep] = useState(0);
  const [advisorAnswer, setAdvisorAnswer] = useState('');
  const [advisorReplies, setAdvisorReplies] = useState([]);
  const [showAdvisor, setShowAdvisor] = useState(false);
  const [error, setError] = useState('');
  const [submission, setSubmission] = useState({ state: 'idle', error: '' });
  const questions = stages[activeTab];
  const question = questions[step];
  const answerKey = `${activeTab}-${question.id}`;
  const selected = answers[answerKey];

  const updateAnswer = (value) => {
    setAnswers((current) => ({ ...current, [answerKey]: value }));
    setError('');
  };

  const resetStage = (tab) => {
    setActiveTab(tab);
    setStep(0);
    setError('');
  };

  const continueSurvey = async () => {
    const validationError = validateAnswer(question, selected);
    if (validationError) {
      setError(validationError);
      return;
    }
    if (step < questions.length - 1) {
      setStep((current) => current + 1);
      return;
    }
    if (activeTab === 'pre') {
      setAdvisorStep(0);
      setAdvisorAnswer('');
      setAdvisorReplies([]);
      setShowAdvisor(true);
      return;
    }
    const payload = buildSubmission({ sessionId, answers, advisorReplies, experiment });
    if (submissionConfig.logToConsole) {
      console.log('Survey submission:', payload);
      console.log('Survey submission JSON:', JSON.stringify(payload, null, 2));
    }
    setSubmission({ state: 'sending', error: '' });
    try {
      await submitSurvey(payload);
      setSubmission({ state: 'submitted', error: '' });
    } catch (submitError) {
      setSubmission({ state: 'error', error: submitError.message });
    }
  };

  const continueAdvisor = () => {
    if (!advisorAnswer) return;
    const replies = [...advisorReplies, advisorAnswer];
    setAdvisorReplies(replies);
    if (advisorStep < advisorConversation.length - 1) {
      setAdvisorStep((current) => current + 1);
      setAdvisorAnswer('');
      return;
    }
    setShowAdvisor(false);
    setActiveTab('post');
    setStep(0);
  };

  if (submission.state === 'submitted') {
    return <SuccessCard onRestart={() => window.location.reload()} />;
  }

  return (
    <>
      <section className="survey-card">
        <SurveyTabs activeTab={activeTab} onSelect={resetStage} />
        <Progress activeTab={activeTab} step={step} total={questions.length} />
        <div className="question">
          <p className="eyebrow">{String(step + 1).padStart(2, '0')} / {String(questions.length).padStart(2, '0')}</p>
          <h2>{question.title}</h2>
          <p className="hint">{question.hint}</p>
          <QuestionAnswer question={question} value={selected} onChange={updateAnswer} onChoose={updateAnswer} error={error} />
        </div>
        <div className="survey-footer">
          <span className="privacy"><span className="lock">⌑</span> Your answers are private</span>
          <button className="button button-dark" disabled={!selected || submission.state === 'sending'} onClick={continueSurvey}>
            {submission.state === 'sending' ? 'Submitting…' : (step === questions.length - 1 ? (activeTab === 'pre' ? 'Continue to after' : 'Finish survey') : 'Next question')} <span>↗</span>
          </button>
        </div>
        {submission.error && <p className="submission-error" role="alert">{submission.error} Please try again.</p>}
      </section>
      {showAdvisor && (
        <AdvisorModal conversation={advisorConversation} step={advisorStep} answer={advisorAnswer} replies={advisorReplies} onChoose={setAdvisorAnswer} onContinue={continueAdvisor} onClose={() => setShowAdvisor(false)} />
      )}
    </>
  );
}