import test from 'node:test';
import assert from 'node:assert/strict';

import { advisorConversation, postQuestions, preQuestions } from '../src/surveyConfig.js';

test('survey stages contain the expected question types and required metadata', () => {
  assert.equal(preQuestions.length, 8);
  assert.equal(postQuestions.length, 3);
  assert.ok(preQuestions.every((question) => question.id && question.title && question.required));
  assert.ok(postQuestions.every((question) => question.id && question.title && question.required));
  assert.ok(preQuestions.filter((question) => question.type === 'choice').every((question) => question.options.length > 0));
});

test('advisor conversation has three prompts with selectable options', () => {
  assert.equal(advisorConversation.length, 3);
  assert.ok(advisorConversation.every((interaction) => interaction.prompt && interaction.options.length >= 2));
});
