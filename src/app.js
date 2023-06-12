const express = require('express');
const parser = require('cookie-parser');
const doten = require('dotenv');
const path = require('path');
const setRouters = require('./routers');
const passport = require('passport');
const { isBoomError, internalError } = require('./middlewares/error.handler');
const app = express();

//settings
app.set('port', process.env.PORT || 3000);

//middlewares 
app.use(express.json());
app.use(parser());
require('./utils/auth');
app.use((req,res,next)=>passport.authenticate('jwt', {session:false}, function(err,user,info,status) {
  req.user=user;
  next();
})(req,res,next));

//Routing
setRouters(app);

//Los middlewares de error se deben poner despues de establecer las rutas.
app.use(isBoomError);
app.use(internalError);

app.get('/', (req,res) => {
  res.json({message: 'Bienvenido a la apiBlog'});
})

app.listen(app.get('port'), () => {
  console.log('Server inicializado')
})
