const app = require('express')();
const routes = require('./routes');

const PORT = 8080;

app.use('/', routes);

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
