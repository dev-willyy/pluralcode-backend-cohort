function validateMiddleware(validator) {
  return (req, res, next) => {
    const { error } = validator(req.body);
    const { details } = error;
    const { message } = details[0];

    if (error) {
      console.error(error);
      return res.status(400).json(message);
    }

    next();
  };
}

module.exports = { validateMiddleware };
