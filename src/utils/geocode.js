
const axios = require('axios')

const geoCode = (address, callback) => {
    const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic3V2YW5rYXIxIiwiYSI6ImNrcncxaWEzczBhemYyb2t4ZmFtaGF5M3IifQ.FBXEbHJnM5GCpXqYkzBlxw'

    axios.get(geoUrl)
        .then((response) => {
            if(response.data.features.length === 0) {
                callback('Invalid Location',undefined)
            } else {
                callback(undefined,{
                    lattitude: response.data.features[0].center[1],
                    longitude: response.data.features[0].center[0],
                    location:  response.data.features[0].place_name
                })
            }
        })
        .catch((error) => {
            callback('Unable to connect to Mapbox',undefined)
        })
}

module.exports = geoCode