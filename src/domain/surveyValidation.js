const validators = {
  name: (value) => value.trim().length >= 2 ? '' : 'Please enter at least 2 characters.',
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()) ? '' : 'Please enter a valid email address.',
  phone: (value) => {
    const trimmed = value.trim();
    const digits = trimmed.replace(/\D/g, '');
    const hasValidCharacters = /^\+?[0-9\s().-]+$/.test(trimmed);
    return hasValidCharacters && digits.length >= 7 && digits.length <= 15
      ? ''
      : 'Please enter a valid phone number with 7–15 digits.';
  },
  area: (value) => value.trim().length >= 2 ? '' : 'Please enter your city or area.',
};

export function validateAnswer(question, value = '') {
  if (question.validation) return validators[question.validation](value);
  return !value && question.required ? 'Please answer this question.' : '';
}
