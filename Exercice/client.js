'use strict'

const net = require('net')
let connect =null
let coninterval


let con = () =>{

let myClient = net.connect(8080, 'localhost' , () => {
    
    clearInterval(coninterval)
    console.log("Enter your username(it must contain at least 3 characters): ")
    process.stdin.on('data' , data =>{
        myClient.write(data);
    })

    myClient.on('data', data =>{
        process.stdout.write(data);
    })

    
    myClient.on('end', data =>{
       process.exit();
    })   

    
})
return myClient;
}

let conect = con();


conect.on("error",(error) =>{
    retryconection();
  })

let retryconection = () =>{
        coninterval = setInterval( () => {
            console.clear();
        console.log("Error reaching the server, trying again.")
        conect.destroy()
        conect=con()
    },1000)
}

/* let retry = setInterval(() => conect.on("error",(error) =>{
    console.log("lol");
    connect = con();
}),1000) */