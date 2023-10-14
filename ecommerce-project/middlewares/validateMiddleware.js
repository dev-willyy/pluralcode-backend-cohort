function validateMiddleware(validator) {
  return (req, res, next) => {
    const { error } = validator(req.body);

    if (error) {
      const { details } = error;
      const { message } = details[0];

      console.error(message);
      return res.status(400).json(message);
    }

    next();
  };
}

module.exports = { validateMiddleware };
