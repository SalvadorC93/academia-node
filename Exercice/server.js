'use strict'

const server = require('net').createServer()
const {EventEmitter} = require('events')
const emitter = new EventEmitter
const fs = require('fs')
const {StringDecoder} = require('string_decoder')
const decoder = new StringDecoder('utf-8')
const bannedwords=["fuck",'shit','dick']
const users = []
const date = new Date()
const path = `./${date.getDay()}-${date.getMonth()+1}-${date.getFullYear()}Chatlog.txt`


server.on('connection', socket =>{
    let counter=0
    
    
    setInterval(()=> {counter = 0
        },10000)
    let message = (msg)=>{
        counter<10 ? (process.stdout.write(`${username} says: ${msg} \n`),counter++,appendchatlog(username,msg))
        : socket.write(`ADMIN says: You have sended a lot messages in quick succecion please wait a moment`)
    }
/********************************************************************************************************** */
    let logout = (username)=>{
        for(let user in users){
            users[user] === username ?
            users.splice(user,1):
            false
        }

    }
    /**************************************************************************************************** */
    let validateusername = (username)=>{
        let validation = false;
        for(let user in users){
            users[user] === username ?
            validation=true:
            false
        }
        return validation

    }
    /**************************************************************************************************** */
    let asignusername = (msg) =>{
        let validation = validateusername(msg)
        msg == "ADMIN" || msg.length<2 || validation == true ? socket.write("Usuario no disponible intente con un nuevo usuario: ")
        :(username=msg,process.stdout.write(`${username} joined \n`),users.push(username))
            //server.write(`${username} joined \n`);
    }

    /**************************************************************************************************** */
    const filter = (msg) =>{
        let ban =false;
        for(let word of bannedwords){
        let lowmsg = msg.toLowerCase();
        let pos = lowmsg.search(word);
        pos>-1 ?   (socket.write(`ADMIN says: no bad words allowed in this server, bye \n`),ban=true ,socket.end()):false
        }
        return ban;
        
    }   
    /************************************************************************************************** */
    const Admincommand = (data) =>{
        let command = false
        let banword = ""
        let msg =  decoder.write(data).trim()
        let validate = msg.search('/banword')
        msg === '/userlist' ? (console.log(users), command = true): false
        msg === '/bannedwords' ? (console.log(bannedwords), command = true): false
        validate>-1 ? (banword = msg.split(" "),bannedwords.push(banword[1]), command = true) : false
        command === false ? (socket.write(`ADMIN says: ${msg}\n`), appendchatlog("Admin",msg)): false
    }

/**************************************************************************************************** */
    const appendchatlog = (user,msg) =>{
        fs.appendFile(`./${date.getDay()}-${date.getMonth()+1}-${date.getFullYear()}Chatlog.txt`,`${user} says: ${msg} \n`, 
        function(err) {
            if(err) {
                return console.log(err);
            }
        });
        }
 /************************************************************************************************* */       
    console.log("client conected");
    let username = false;
    socket.on('data', data => {
        let msg =  decoder.write(data).trim();
        let ban = false;
       // console.log(ban);
        ban = filter(msg);
        if(!ban){
        if(!username){ 
            asignusername(msg);
        }else{
            message(msg);
       }
       msg === 'logout' ? socket.end() : false;}

       
    })

    
    process.stdin.on('data' , data =>{   
        Admincommand(data); 
    })

    

    socket.on("end", ()=>{
        username != "" ?
        console.log(`bye ${username}, have a nice day!`):console.log("Un usuario ah sido banneado")
        logout(username)
    })

    

} )


fs.access(path, fs.F_OK, (err) => {
  if (err) {
    fs.writeFile(path, "Hey there!\n", function(err) {
        if(err) {
            return console.log(err);
        }
    
        console.log("The chatlog has been created");
    });
    return
  }

  //file exists
})




server.listen(8080, () => {
    console.log(`server is listening in te port ${8080}`);
    
})

