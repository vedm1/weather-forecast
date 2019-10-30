const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//console.log(path.join(__dirname, '../public'));

const app = express();
const port = process.env.PORT || 3000;

//Express Configs
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup Handlebars engines and views paths
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup current serving static directory
app.use(express.static(publicDir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ved Muthal'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Ved Muthal'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'For any help or queries, please contact humans@thehumansintech.com',
        name: 'Ved Muthal'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must enter the address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {})=> {
       if (error){
           return res.send({ error })
       }
       forecast(latitude, longitude, (error, forecastData)=>{
           if (error){
               return res.send({ error })
           }
           res.send({
               forecast: forecastData,
               location,
               address: req.query.address
           })
       })
    });
});

app.get('/products', (req, res) => {
   res.send({
       products: [],
   })
});


//Set all your handlers above this
app.get('/help/*', (req, res) =>{
    res.render('help404', {
        message: 'Help Article Not Found',
        name: 'Ved Muthal',
    })
});

app.get('*', (req, res) =>{
    res.render('404', {
        message: 'We could not find what you are looking for',
        name: 'Ved Muthal',
    })
});

app.listen(port,() => {
     console.log('Server is running on Port ' + port)
});
