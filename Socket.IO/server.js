const express = require("express")
const socket = require("socket.io")

const app = express();



app.use(express.static('public'))

const port =process.env.PORT || 5000;

const server = app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı..`);
  });
  
const io = socket(server)

// io.on('connection',(socket)=>{
//     console.log("User connection :",socket.id)
  
//     socket.on('disconnect',()=>{
//         console.log("User disconnect")
//     })

    // socket.on("sendMessageToServer",()=>{
    //     console.log("sendMessageToServer tetiklendi")
    // })

    // socket.emit("sendMessageToClient",23);

    // socket.on("name",data=>{
    //     console.log("Adınız :"+data)
    // })
  // })

  io.on("connection", client => {
    console.log(`Client bağlandı. Client id : ${client.id}`);
    client.on("disconnect", () => console.log(`Bağlantı kesildi. Client id : ${client.id}`));
    client.on("login", data => client.broadcast.emit("message", data));
});
