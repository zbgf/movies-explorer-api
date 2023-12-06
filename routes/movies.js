const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const {
  validationMovie,
  validationDeleteMovie,
} = require('../utils/validation');

router.get('/movies', getMovies);
router.post('/movies', validationMovie, createMovie);
router.delete('/movies/:movieId', validationDeleteMovie, deleteMovie);

module.exports = router;
