const { celebrate, Joi } = require('celebrate');

const validURL = /^(https?:\/\/)(www\.)?([\w-.~:/?#[\]@!$&')(*+,;=]*\.?)*\.{1}[\w]{2,8}(\/([\w-.~:/?#[\]@!$&')(*+,;=])*)?/;

module.exports.validationUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
  }),
});

module.exports.validationProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports.validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const movieIdJoi = { movieId: Joi.string().length(24).hex().required() };

module.exports.validationDeleteMovie = celebrate({
  params: Joi.object().keys(movieIdJoi),
});

module.exports.validationMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(validURL),
    trailerLink: Joi.string().required().regex(validURL),
    thumbnail: Joi.string().required().regex(validURL),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});
