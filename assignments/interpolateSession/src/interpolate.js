const interpolate = (value, session = {}, options = {}) => {
  if (!value) {
    return;
  }

  const leftDelimiter = options.leftDelimiter;
  const rightDelimiter = options.rightDelimiter;
  const sessionInputs = Object.keys(session);

  sessionInputs.forEach((input) => {
    const interpolateKey = leftDelimiter + input + rightDelimiter;
    const interpolateValue = session[input] ? session[input] : "";
    value = value.replace(new RegExp(interpolateKey, "g"), interpolateValue);
  });

  if (leftDelimiter && rightDelimiter) {
    const interpolateKey = leftDelimiter + ".*?" + rightDelimiter;
    value = value.replace(new RegExp(interpolateKey, "g"), "");
  }
  return value;
};

module.exports = { interpolate };
