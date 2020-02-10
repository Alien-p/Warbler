const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8081;
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/error');

app.use(cors());
app.use(bodyParser.json());

app.use( (req, res, next) => {
  let err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});
app.use(errorHandler);

 app.listen(PORT, () => {
   console.log(`Applicaton listening on port ${PORT}`)
 })