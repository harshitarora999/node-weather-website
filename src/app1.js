const express = require('express')
const path = require('path')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 5000
const geocode = require('./geocodepath/geocode')
const forecast = require('./geocodepath/forecast')

const assetsPath = path.join(__dirname, '../publicpath')
const partialpath = path.join(__dirname,'./templatepath/partials')
const viewspath = path.join(__dirname,'./templatepath/views')

app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialpath)
app.use(express.static(assetsPath))

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'HELP',
        saying: 'HELP ME!!',
        bottom: 'Created By Harshit Arora'
    })
})
app.get('',(req,res)=>{//to provide attributes of hbs value to app
    res.render('index',{
        title: 'Weather App',
        name: 'Search For Weather by Location',
        bottom: 'Created By Harshit Arora'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'ITS BENZ',
        name: 'About Benz',
        bottom: 'Created By Harshit Arora'
    })
})

app.get('/weather',(req,res)=>{
    if (!req.query.address) {
        return res.send({
            error: 'Please Provide an Address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location} = {}) => { //geocode calling //empty '{}' is provided to run the code even if address is empty
        if (error) {
            return res.send({error})
        } else{
            timecode(latitude,longitude,(error,data1) => { //forecast calling
                if (error) {
                    return res.send({error})
                }
                res.send({
                    timecode: data1
                })
            })
            forecast(latitude,longitude, (error,data2) => { //forecast calling
                if (error) {
                    return res.send({error})
                } else{
                    res.send({
                        forecast: data2,
                        location,
                        address: req.query.address
                    })                    
                }
            })
        }
    })
})

app.get('/products',(req,res) =>{
    if (!req.query.search) {
        return res.send({//by providing return we stoping the execution and not leting the express to execute res.send again 
            error: 'SAERCH AGAIN'
        })
    }
    //req.query allow us to pass some requests as query to browser
    res.send({   //sends the json data to browser
        products: []
    })
})

app.get('/help/*',(req,res) =>{//"*" for url not matching with provivded urls WILDCARD"*" this clause must be put in last of all clause
    res.render('404error',{//error page info hbs file call
        error: 'Help Not Found',
        title: 'Help Cannot Found',
        bottom: 'SEARCH AGAIN'
    })
})

app.get('*',(req,res) =>{
    res.render('404error',{//error page info hbs file call
        error: 'PAGE NOT FOUND',
        title: 'HELP ERROR',
        bottom: 'SEARCH AGAIN'

    })
})

app.listen(port, () =>{//providing a localhost for file running
    console.log('server running port' + port)
})