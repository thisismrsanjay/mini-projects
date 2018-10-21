const express = require('express');
const app  = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const port = process.env.PORT || 3000;

io.on('connection',(socket)=>{
    socket.broadcast.emit('announce', {
        message:'New Client  '
    });
    socket.on('send',(data)=>{
        socket.broadcast.emit('message',{
            
            message:data.message,
            author:data.author
        })
    })
    socket.on('signal',(data)=>{
        socket.broadcast.emit('signaling_message',{
            type:data.type,
            message:data.message
        })
    })

})



app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.get('/',(req,res)=>{
    res.render('index');
})
server.listen(port,()=>{
    console.log('server started ')
})