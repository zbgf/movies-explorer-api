require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');

const userRoute = require('./routes/users');
const movieRoute = require('./routes/movies');
const { createUser, login } = require('./controllers/users');
const { validationUser, validationLogin } = require('./utils/validation');
const { auth } = require('./middlewares/auth');
const NotFoundError = require('./utils/error/notFound');
const error = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors({
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
  allowedHeaders: ['Authorization', 'Content-Type'],
}));

app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

app.use(requestLogger);

app.post('/signin', validationLogin, login);
app.post('/signup', validationUser, createUser);

app.use(auth, userRoute);
app.use(auth, movieRoute);
app.use('*', auth, (req, res, next) => next(new NotFoundError('Страница не существует')));

app.use(errorLogger);

app.use(errors());

app.use(error);

app.listen(PORT, () => {
  console.log(`Слушаю порт ${PORT}`);
});
