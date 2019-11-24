/* eslint-disable no-console */
const sqlite3 = require('sqlite3').verbose();

function moviesDb(callback) {
  const data = [
    ['IMDB ID', 'TITLE', 'GENRE', 'RELEASE DATE', 'BUDGET'],
  ];

  const sql = 'SELECT imdbId, title, genres, releaseDate, budget FROM movies LIMIT 3';

  const db = new sqlite3.Database('./database/movies.db', sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to SQLite Movie DB');
  });

  db.serialize(() => {
    db.each(sql, (err, row) => {
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

function ratingsDb() {

}

module.exports = {
  moviesDb,
  ratingsDb,
};
