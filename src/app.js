const express = require('express');
const parser = require('cookie-parser');
const doten = require('dotenv');
const path = require('path');
const setRouters = require('./routers');
const { isBoomError, internalError } = require('./middlewares/error.handler');
const app = express();

//settings
app.set('port', process.env.PORT || 3000);

//middlewares 
app.use(express.json());
app.use(parser());

//doten.config({path: path.join(__dirname,'.env')});

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
