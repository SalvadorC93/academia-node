'use strict'

const net = require('net');

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