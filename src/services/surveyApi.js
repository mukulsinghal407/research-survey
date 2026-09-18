const endpoint = '/.netlify/functions/submit-survey';

export async function submitSurvey(submission) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(submission),
  });
  const result = await response.json();
  if (!response.ok || !result.accepted) {
    throw new Error(result.error || 'The survey could not be submitted.');
  }
  return result;
}
