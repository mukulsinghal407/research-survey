# research-survey

## Editing survey questions

All pre-activity, post-activity, and beauty-advisor questions are configured in
[`src/surveyConfig.js`](./src/surveyConfig.js). Update the question text,
options, or field metadata there; the React UI will render the changes
automatically.

Pre-activity questions support `text`, `email`, `tel`, and `choice` types.
Choice options are intentionally written as intervals where frequency is
measured, rather than asking participants for an exact count.

Text answers use a small validation abstraction in `src/main.jsx`: each
question declares a validation key, and the corresponding validator checks
the value before the participant can continue. This includes email format,
phone format (7–15 digits with international formatting support), and
non-empty name/area checks.

## Experiment randomisation

The experiment assignment is configured in
[`src/surveyConfig.js`](./src/surveyConfig.js). At the start of each survey
runtime, the app generates an integer from 1 to 100 exactly once. If the
number is greater than `aiThreshold`, the participant is assigned to `ai`;
otherwise they are assigned to `human`. For example, a threshold of `50`
produces AI for 51–100 and human for 1–50. The assignment is kept out of the
participant-facing UI so the study remains blind. The `advisorGroup` value in
`src/main.jsx` is the integration point for routing the conversation to the
appropriate human or AI service.

## Local submission logging

When the participant finishes, the complete JSON payload is printed as both an
object and formatted JSON in the browser console. This is controlled by
`submissionConfig.logToConsole` in `src/surveyConfig.js`; set it to `false`
before collecting real participant data because the payload contains personal
information.

## Frontend architecture

The frontend is organized around small, single-purpose modules:

- `src/components/` contains reusable presentation components such as the
  question renderer, progress indicator, advisor modal, and success card.
- `src/domain/` contains experiment assignment and answer-validation rules.
- `src/surveyConfig.js` remains the single place to configure questions,
  choices, validation keys, and experiment settings.

`src/main.jsx` composes these modules and owns the survey workflow state. New
question types can be added to `QuestionAnswer` without rewriting the survey
workflow, and a storage or queue provider can be added to the API service
without coupling it to the React components.