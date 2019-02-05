'use strict'

const net = require('net');
let connect =null;


let con = () =>{

let myClient = net.connect(8080, 'localhost' , () => {
    

    console.log("Enter your username: ")
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

conect.on('aloha',()=>{
    console.log("aloha")
})

conect.on("error",(error) =>{
    console.log("Error reaching the server please restart the aplication")
    conect.destroy();
})

/* let retry = setInterval(() => conect.on("error",(error) =>{
    console.log("lol");
    connect = con();
}),1000) */