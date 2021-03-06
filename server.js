const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port =process.env.PORT || 3000;

var app = express();
hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs')



app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) =>{
        if(err){
            console.log('Unable to blablalba');
        }
    });
    next();
})

// app.use((req, res, next) =>{
//     res.render('maintence.hbs');    
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text)=>{
return text.toUpperCase();
})


app.get('/',(rec, res) =>{
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage:'hi',
    })
})

app.get('/about', (rec, res) =>{
    res.render('about.hbs', {
        pageTitle: 'About Page',
    })
})

app.get('/project',(rec, res) =>{
    res.render('project.hbs',{
        pageTitle: "Project page"
    })
})


app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
});

