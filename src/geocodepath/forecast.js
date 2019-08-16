const request = require('request') 
const forecast = (latitude,longitude,callback) => {  //FORECAST function
    const url = 'https://api.darksky.net/forecast/8b43395c3e6cc88b3641732758389f8f/' + latitude + ',' + longitude + '?units=si'

    request({url, json : true }, (error,{body}) => {//url must be kept url not as another name
        if(error) {
            callback('Error in Network',undefined)
        } else if(body.error){
            callback('Error in location',undefined)
        } else{
            callback(undefined, body.daily.data[1].summary + ' it is Currently ' + body.currently.temperature + ' degrees out. ' + 'There is a ' + body.currently.precipProbability+'%' + ' chance of rain.')
        }
    })
}
module.exports= forecast //Exporting of forecast IMP