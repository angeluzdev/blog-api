const express = require('express');
const parser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const setRouters = require('./routers');
const passport = require('passport');
const { isBoomError, internalError } = require('./middlewares/error.handler');
const app = express();

//settings
app.set('port', process.env.PORT || 3000);
const list = ['http://127.0.0.1:5500'];
//middlewares 
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: 'https://blog-front-eight-pi.vercel.app'
}));

app.use(parser());
require('./utils/auth');
app.use((req,res,next)=>passport.authenticate('jwt', {session:false}, function(err,user,info,status) {
  req.user=user;
  next();
})(req,res,next));

//Routing
setRouters(app);


app.use(isBoomError);
app.use(internalError);

app.listen(app.get('port'), () => {
  console.log('Server inicializado')
})
