/* eslint-disable no-console */
const async = require('async');
const { table } = require('table');

const tableConfig = require('../config/tableConfig');
const { moviesDb } = require('../database/db');

module.exports = (req, res) => {
  const { id } = req.params;
  const sqlQuery = `SELECT imdbId, title, overview, releaseDate, budget, runtime, genres, language, productionCompanies FROM movies WHERE movieId=${id}`;

  function setQuery(callback) {
    callback(null, sqlQuery);
  }

  function formatMovieList(result, callback) {
    const output = table(result.query_movies_db, tableConfig);
    callback(null, output);
  }

  async.auto({
    set_query: setQuery,
    query_movies_db: ['set_query', moviesDb],
    format_movie_list: ['query_movies_db', formatMovieList],
  }, (err, result) => {
    if (err) {
      console.error(err.message);
    }
    res.send(result.format_movie_list);
  });
};
