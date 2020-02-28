require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8081;
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');
const db = require('./models')
const {loginRequirement, ensureCorrectUser} = require('./middleware/auth');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);

app.use('/api/user/:id/messages', loginRequirement, ensureCorrectUser, messageRoutes);

app.get('/api/messages', loginRequirement, async function(req, res, next) {
  try {
    let messages = await db.Message.find().
      sort({createdAt: 'desc'}).
      populate('User', {username: true, profileImageUrl: true});
    
      return res.status(200).json(messages);
  } catch (error) {
    return next(error);
  } 
})

app.use( (req, res, next) => {
  let err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

 app.listen(PORT, () => {
   console.log(`Applicaton listening on port ${PORT}`)
 })