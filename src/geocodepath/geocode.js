const request = require('request') //requesting URL
const geocode = (address,callback) => { //GEOCODE function
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYXJvcmFzaGFyayIsImEiOiJjanltbGNjcjkwa2ZrM2xudHB3aThrc2lrIn0.zSvqcM9jAeD6PW1j3mXdvw&limit=si'

    request({url, json : true }, (error,{body}) => {//url must be kept url not as another name
        if(error) {
            callback('Error in Network',undefined)
        } else if (body.features.length === 0) {
            callback('Invalid Address',undefined)
        } else {
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}
module.exports= geocode //Exporting of geocode IMP