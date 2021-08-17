
const axios = require('axios')

    const forecast = (lattitude, longitude, callback) => {
        const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat='+ lattitude + '&lon=' + longitude + '&appid=b80474f55c21e75854d5b0b5d160ddba&units=metric'

        axios.get(weatherUrl)
            .then((response) => { 
                    callback(undefined, 'It is currently ' + response.data.main.temp + ' degress out. Humidity is  ' + response.data.main.humidity + ' and forecast is '+ response.data.weather[0].description + '.')
            })
            .catch((error) => {
                if(error.response){
                callback(error.response.data.message, undefined)
            
        } else{
            callback('Unable to Connect to the app', undefined)
        }
    })
    }

    module.exports = forecast