const mongoose = require('mongoose');

mongoose.set("debug", true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.Promise = Promise;

mongoose.connect("mongodb://localhost/warbler", {
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports.User = require('./user');
module.exports.Message = require('./message');
