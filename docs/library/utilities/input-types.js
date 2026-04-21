const types = new Set([
  'text',
  'password',
  'email',
  'url',
  'search',
  'tel',
  'number',
  'range',
  'date',
  'datetime-local',
  'month',
  'week',
  'time',
  'file',
  'checkbox',
  'radio',
  'hidden',
  'button',
  'submit',
  'reset',
  'color',
  'image'
]);

export const inputTypes = (value) => types.has(value);