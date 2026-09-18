// Edit this file to change the survey questions without changing the survey UI.
export const experimentConfig = {
  // 1-100 are assigned once per browser runtime. Values above this go to AI.
  aiThreshold: 50,
};

export const submissionConfig = {
  // Keep enabled while testing locally. Disable before collecting real data.
  logToConsole: true,
};

export const preQuestions = [
  {
    id: 'consent',
    type: 'choice',
    title: 'Do you consent to taking part in this research study?',
    hint: 'Your responses will be used for research purposes. You may stop at any time.',
    options: ['Yes, I consent to participate'],
    required: true,
  },
  {
    id: 'name',
    type: 'text',
    title: 'What name should we use for you?',
    hint: 'Use the name you would like us to use during the experience.',
    placeholder: 'Your name',
    required: true,
    validation: 'name',
  },
  {
    id: 'email',
    type: 'email',
    title: 'What is your email address?',
    hint: 'We will only use this for research administration.',
    placeholder: 'you@example.com',
    required: true,
    validation: 'email',
  },
  {
    id: 'phone',
    type: 'tel',
    title: 'What is your phone number?',
    hint: 'Include your country code if you are outside Singapore.',
    placeholder: '+65 0000 0000',
    required: true,
    validation: 'phone',
  },
  {
    id: 'ageRange',
    type: 'choice',
    title: 'Which age range are you in?',
    hint: 'Choose the range that best describes you.',
    options: ['Under 18', '18–24', '25–34', '35–44', '45–54', '55 or above', 'Prefer not to say'],
    required: true,
  },
  {
    id: 'gender',
    type: 'choice',
    title: 'How do you describe your gender?',
    hint: 'Select the option that feels most appropriate.',
    options: ['Woman', 'Man', 'Non-binary / gender diverse', 'Prefer to self-describe', 'Prefer not to say'],
    required: true,
  },
  {
    id: 'area',
    type: 'text',
    title: 'Which area do you currently live in?',
    hint: 'A city, region, or postal district is enough; please do not share your full address.',
    placeholder: 'City or area',
    required: true,
    validation: 'area',
  },
  {
    id: 'purchaseFrequency',
    type: 'choice',
    title: 'How often do you purchase beauty products?',
    hint: 'Choose the interval that best matches your usual behaviour.',
    options: ['Never', 'Less than once every 6 months', 'Every 3–5 months', 'Every 1–2 months', 'At least twice a month'],
    required: true,
  },
];

export const postQuestions = [
  {
    id: 'value',
    type: 'choice',
    title: 'How valuable was this experience for you?',
    hint: 'Think about the last hour.',
    options: ['Not yet', 'A little', 'Quite a lot', 'A great deal'],
    required: true,
  },
  {
    id: 'confidence',
    type: 'choice',
    title: 'How confident do you feel using what you learned?',
    hint: 'Your honest answer helps us improve.',
    options: ['Not confident yet', 'I need more practice', 'Mostly confident', 'Ready to try it'],
    required: true,
  },
  {
    id: 'return',
    type: 'choice',
    title: 'What should we make room for next time?',
    hint: 'Choose what would bring you back.',
    options: ['More time to practise', 'More conversation', 'A deeper dive', 'A new surprise'],
    required: true,
  },
];

export const advisorConversation = [
  {
    prompt: 'Welcome! Let’s find the right routine for you. What is your skin type?',
    options: ['Dry', 'Oily', 'Combination', 'Sensitive / reactive'],
  },
  {
    prompt: 'Thanks! What would you most like to improve?',
    options: ['Hydration and glow', 'Breakouts and congestion', 'Uneven tone or dark spots', 'Fine lines and firmness'],
  },
  {
    prompt: 'How would you like your routine to feel?',
    options: ['Simple and quick', 'A calming self-care ritual', 'Targeted and effective', 'I am not sure yet'],
  },
];
