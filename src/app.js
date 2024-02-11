const express=require('express')
const utils=require('./utils.js')
const path=require('path')
const hbs=require('hbs')
const app=express()
const partialPath=path.join(__dirname,"../templates/partials")
const pathDir=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,"../templates/views")
const port=process.env.PORT || 3000
app.set('view engine','hbs')
app.set('views',viewPath)
app.use(express.static(pathDir))
hbs.registerPartials(partialPath)
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Rohit Shaw'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Rohit Shaw'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'Tatakae',
        title:'Help',
        name:'Rohit Shaw'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please pass address'
        })
    }
        utils.geoCode(req.query.address,(error,{latitude,longitude}={})=>{
            if(error){
                return res.send({error})
            }
            utils.forecast(latitude,longitude,(error,{weather_descriptions='',temperature}={})=>{
                if(error){
                    return res.send({error})
                }
                return res.send({
                    forecast:weather_descriptions,
                    location:'India',
                    address:req.query.address
                })
                //console.log("The weather is "+weather_descriptions+". It is currently "+temperature+" degress out.")
            })
        })
    // res.send({
    //     forecast:'It is Showing',
    //     location:'India',
    //     address:req.query.address
    // })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        helpText:'errorPage',
        title:'404',
        name:'Html doc not founds'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        helpText:'errorPage',
        title:'404',
        name:'Page Not Found'
    })
})
app.listen(port,()=>{
    console.log('server is running at port '+port)
})