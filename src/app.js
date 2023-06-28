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
app.use(express.static(path.join(__dirname,'public')));
app.use(cors({
  credentials: true,
  origin: 'http://127.0.0.1:5500'
}));

app.use(parser());
require('./utils/auth');
app.use((req,res,next)=>passport.authenticate('jwt', {session:false}, function(err,user,info,status) {
  req.user=user;
  console.log(req.cookies);
  next();
})(req,res,next));

//Routing
setRouters(app);

//Los middlewares de error se deben poner despues de establecer las rutas.
app.use(isBoomError);
app.use(internalError);

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname,'/public/index.html'));
})

app.listen(app.get('port'), () => {
  console.log('Server inicializado')
})
