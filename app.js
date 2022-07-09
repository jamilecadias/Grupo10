const express = require ('express');
const path = require ('path');
const app = express ();
const publicPath= path.resolve(__dirname, './public')
const methodOverride =  require('method-override');

const mainRouter = require('./src/routes/mainRouter');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(publicPath));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');

app.use('/' , mainRouter);

app.use((req,res,next)=>{
    res.status(404).render('error')
})

app.listen (3000, (req, res)=> console.log ('Servidor 3000 funcionando'));