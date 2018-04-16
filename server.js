const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs'); //value set, value view


app.use((req, res, next) => { //register a express, next means async
    var now = new Date().toString(); //human readable timestamp
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log); //see what website they are going and time
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.')
        }
    })
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public')); //built in piece middleware, its like app.get()

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
}) //name, function

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})

app.get('/', (req, res) => { //req: request, res: response, localhost:3000
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website',
    });
});

app.get('/about', (req, res) => { //localhost:3000/about
    res.render('about.hbs', { //inside {} is object and dynamically reference the about.hbs
        pageTitle: 'About Page',
    }); //to render to our view or hbs we have now
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
}); //port
