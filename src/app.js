const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const geoCode = require('./utils/geocode')
const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewDirectortyPath = path.join(__dirname, '../templates/views')
const partialsDirectoryPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewDirectortyPath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsDirectoryPath)


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Suvankar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Suvankar',
        text: 'This is about page'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Suvankar',
        text: 'This is Help Guide'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please Provide an Address'
        })
    }

    geoCode(req.query.address, (error, {lattitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
            forecast(lattitude, longitude, (error, forecastresponse) => {
                if(error){
                    return res.send({error})
                    
                }
                res.send({
                    forecast: forecastresponse,
                    location: location,
                    address: req.query.address
                })
            }) 
    })
    })


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Suvankar',
        errorText: 'Help Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Suvankar',
        errorText: 'Page not found'
    })
})

app.listen(port, (req, res) => {
    console.log(`Server is starting at port: ${port}`)
})