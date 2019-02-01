'use strict'

const server = require('net').createServer();
const {StringDecoder} = require('string_decoder');
const decoder = new StringDecoder('utf-8');
const bannedwords=["fuck",'shit','dick','bitch']


server.on('connection', socket =>{
    let mensaje = (msg)=>{
        process.stdout.write(`${username} says: ${msg} \n`)
    }
    console.log(" client conected");
    let username = false;
    socket.on('data', data => {
        let msg =  decoder.write(data).trim();
        let ban = false;

        for(let word of bannedwords){
            let lowmsg = msg.toLowerCase();
            let pos = lowmsg.search(word);
            pos>-1 ?   (socket.write(`ADMIN says: no bad words allowed in this server, bye`),ban=true ,socket.end()):false
        }
        if(!ban){
        if(!username){ 
            if(msg == "ADMIN"){
                socket.write("Usuario no disponible intente con un nuevo usuario: ");
            }else{
                username=msg;
                process.stdout.write(`${username} joined \n`);
                //server.write(`${username} joined \n`);
        }
        }else{
            mensaje(msg);
       }
       if(msg === 'logout'){
           socket.end();
       }}

       
    })

    process.stdin.on('data' , data =>{
        socket.write(`ADMIN says: ${data}`);
    })

    socket.on("end", ()=>{
        console.log("bye");
    })
} )

server.listen(8080, () => {
    console.log(`server is listening in te port ${8080}`);
})
