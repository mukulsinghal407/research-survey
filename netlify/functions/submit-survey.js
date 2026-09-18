const json = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  },
  body: JSON.stringify(body),
});

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Only POST requests are accepted.' });
  }

  if (!event.body) {
    return json(400, { error: 'A JSON submission is required.' });
  }

  let submission;
  try {
    submission = JSON.parse(event.body);
  } catch {
    return json(400, { error: 'Request body must be valid JSON.' });
  }

  if (!submission.sessionId || !submission.participant || !submission.experiment) {
    return json(400, { error: 'Submission is missing required fields.' });
  }

  // Provider integration belongs here: persist to storage or publish to a queue.
  console.info('Survey submission accepted', {
    sessionId: submission.sessionId,
    experimentGroup: submission.experiment.group,
  });

  return json(202, {
    accepted: true,
    sessionId: submission.sessionId,
  });
};
