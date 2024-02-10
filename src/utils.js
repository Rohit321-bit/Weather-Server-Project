const request=require('request')

// const position='http://api.positionstack.com/v1/forward?access_key=b11942170ebda9f1777a5fc2ad12b642&query=39,Jaigirghat Road Sen Mukherjee Paschm Barisha,Kolkata&limit=1';
// request({url:url},(error,response)=>{
//     const jsonObj=JSON.parse(response.body)
//     console.log(jsonObj.current.weather_descriptions[0]);
// })
// request({url:position,json:true},(error,response)=>{
//     console.log("latitude "+response.body.data[0].latitude+" longitude "+response.body.data[0].longitude+" city "+response.body.data[0].locality
//     +" State "+response.body.data[0].region)
// })

const geoCode=(address,callback)=>{
    const url='http://api.positionstack.com/v1/forward?access_key=b11942170ebda9f1777a5fc2ad12b642&query='+encodeURI(address)+'&limit=1';
    // console.log(url)
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect',undefined)
        }
        else if(response.body.data===undefined){
            callback('Unable to find Location!',[])
        }
        else{
            callback('',{
                longitude:response.body.data[0].longitude,
                latitude:response.body.data[0].latitude,
                city:response.body.data[0].locality
            })
        }
    })
}
const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=aee37f8470e90dee8ddf5558f0399faf&query='+latitude+','+longitude+'&units=f';
    // console.log(url)
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Cant connect to services!',undefined)
        }
        else{
            callback(undefined,response.body.current)
        }
        })
}
module.exports={
    geoCode:geoCode,
    forecast:forecast
}