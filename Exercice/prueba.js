let counter = 0
let timer =setInterval(()=>{
        console.log(counter)
       counter<10 ? counter++ : clearInterval(timer)

    },1000)