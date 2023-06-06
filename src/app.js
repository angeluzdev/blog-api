const express = require('express');
const parser = require('cookie-parser');
const doten = require('dotenv');
const path = require('path');
const app = express();

//settings
app.set('port', process.env.PORT || 3000);

//middlewares 
app.use(express.json());
app.use(parser());
doten.config({path: path.join(__dirname,'.env')});

app.get('/', (req,res) => {
  res.json({message: 'Bienvenido a la apiBlog'});
})

app.listen(app.get('port'), () => {
  console.log('Server inicializado')
})
