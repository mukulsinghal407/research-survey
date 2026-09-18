import test from 'node:test';
import assert from 'node:assert/strict';

import { assignExperimentGroup, createSessionId } from '../src/domain/experiment.js';

test('assigns AI participants above the AI threshold', () => {
  const originalRandom = Math.random;
  Math.random = () => 0.5;
  try {
    assert.deepEqual(assignExperimentGroup(), { assignedNumber: 51, group: 'ai' });
  } finally {
    Math.random = originalRandom;
  }
});

test('assigns human participants below the threshold', () => {
  const originalRandom = Math.random;
  Math.random = () => 0.49;
  try {
    assert.deepEqual(assignExperimentGroup(), { assignedNumber: 50, group: 'human' });
  } finally {
    Math.random = originalRandom;
  }
});

test('creates a non-empty session ID', () => {
  const sessionId = createSessionId();
  assert.equal(typeof sessionId, 'string');
  assert.ok(sessionId.length > 0);
});
