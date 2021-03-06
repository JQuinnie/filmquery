const router = require('express').Router();

const getMovieList = require('./getMovieList');
const getMovieId = require('./getMovieId');

router.get('/movies', getMovieList);
router.get('/movies/:id', getMovieId);
// router.get('/movies/:year', getMovieYear);
// router.get('/movies/:genre', getMovieGenre);

module.exports = router;
