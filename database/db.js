/* eslint-disable no-console */
const sqlite3 = require('sqlite3').verbose();

function moviesDb(sqlQuery, callback) {
  const data = [
    ['IMDB ID', 'TITLE', 'GENRE', 'RELEASE DATE', 'BUDGET'],
  ];

  const db = new sqlite3.Database('./database/movies.db', sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to SQLite Movie DB');
  });

  db.serialize(() => {
    db.each(sqlQuery.set_query, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(`${row.imdbId} | ${row.title} | ${row.genres} | ${row.releaseDate} | ${row.budget}`);
      data.push([row.imdbId, row.title, row.genres, row.releaseDate, `$${row.budget.toFixed(2)}`]);
    });
  });

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Closing database connection.');

    callback(null, data);
  });
}

function ratingsDb(movieId, callback) {

}

module.exports = {
  moviesDb,
  ratingsDb,
};
