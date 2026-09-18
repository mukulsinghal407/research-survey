import test from 'node:test';
import assert from 'node:assert/strict';

import { validateAnswer } from '../src/domain/surveyValidation.js';

test('requires an answer for required questions', () => {
  assert.equal(validateAnswer({ required: true }, ''), 'Please answer this question.');
  assert.equal(validateAnswer({ required: true }, 'answer'), '');
});

test('validates names and areas after trimming whitespace', () => {
  assert.equal(validateAnswer({ required: true, validation: 'name' }, ' A '), 'Please enter at least 2 characters.');
  assert.equal(validateAnswer({ required: true, validation: 'name' }, 'Alex'), '');
  assert.equal(validateAnswer({ required: true, validation: 'area' }, ' '), 'Please enter your city or area.');
  assert.equal(validateAnswer({ required: true, validation: 'area' }, 'Queenstown'), '');
});

test('validates email addresses', () => {
  assert.equal(validateAnswer({ validation: 'email' }, 'person@example.com'), '');
  assert.equal(validateAnswer({ validation: 'email' }, 'person@example'), 'Please enter a valid email address.');
  assert.equal(validateAnswer({ validation: 'email' }, 'person@ example.com'), 'Please enter a valid email address.');
});

test('accepts formatted phone numbers with 7 to 15 digits', () => {
  assert.equal(validateAnswer({ validation: 'phone' }, '+65 8123 4567'), '');
  assert.equal(validateAnswer({ validation: 'phone' }, '(65) 8123-4567'), '');
  assert.equal(validateAnswer({ validation: 'phone' }, '123456'), 'Please enter a valid phone number with 7–15 digits.');
  assert.equal(validateAnswer({ validation: 'phone' }, '+65 ABC 1234'), 'Please enter a valid phone number with 7–15 digits.');
});
