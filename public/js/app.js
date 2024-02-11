console.log('Client side javascript file is loaded!');


const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const message1=document.querySelector('#msg-1')
const message2=document.querySelector('#msg-2')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const loc=search.value
    message1.textContent='Loading....'
    message2.textContent=''
    fetch('/weather?address='+loc).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                message1.textContent=data.error
            }
            else{
                message1.textContent="The weather is"+data.forecast[0]
                message2.textContent="The Location is"+data.location
                console.log(data.forecast[0])
                console.log(data.location)
                console.log(data.address)
            }
            
        })
    })
})