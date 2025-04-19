export const inputTypes = (value) => {
  const types = [
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
    'image'];
  return types.includes(value);
}