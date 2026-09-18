import { experimentConfig } from '../surveyConfig';

export function assignExperimentGroup() {
  const assignedNumber = Math.floor(Math.random() * 100) + 1;
  const group = assignedNumber > experimentConfig.aiThreshold ? 'ai' : 'human';
  return { assignedNumber, group };
}

export function createSessionId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `session-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
