const express = require ('express');
const path = require ('path');
const app = express ();
const publicPath= path.resolve(__dirname, './public')

const mainRouter = require('./src/routes/mainRouter');

app.use(express.static(publicPath));

app.set('view engine', 'ejs');
app.set('views' , path.join(__dirname , './views'));

app.use('/' , mainRouter);

app.listen (3000, (req, res)=> console.log ('Servidor 3000 funcionando'));