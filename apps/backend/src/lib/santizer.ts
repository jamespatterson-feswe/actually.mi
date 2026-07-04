import sanitizeHtml from 'sanitize-html';

const sanitize = (value: string) => {
  if (!value) return '';

  return sanitizeHtml(value, {
    allowedTags: [],
    allowedAttributes: {},
  });
};

export default sanitize;
