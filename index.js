require('dotenv').config();

const express = require('express');
const bosyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

require('./middlewares/auth');
const models = require('./models');
const routes = require('./routes');
const unprotectedRoutes = require('./routes/unprotectedRoutes');
 
models.sequelize.authenticate()
 .then(() => console.log("BD conectada"))
  .catch((error) => console.log(error));

  const app = express();
  app.set('port', process.env.APP_PORT);

  //eneable bosyparser
  app.use(bosyParser.json());
  app.use(bosyParser.urlencoded({ extended: true}));

  //enable CORS
  app.use(cors());
  app.enable('trust proxy');

// app routes 
app.use('/', unprotectedRoutes());
app.use('/',  passport.authenticate('jwt', { session: false}), routes());

//server port
app.listen(app.get('port'), () => {
    console.log(`up and running on port ${app.get('port')}`);

});