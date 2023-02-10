const express = require('express')
const app = express();



const server = require("http").createServer(app) // from node js by defeault 
const PORT  = 5001 
const io = require ("socket.io")(server, {//socket.io to make server send data and recive 

    cors:{
    origin:"http://localhost:3000",
    methods:["GET","POST"]
         
    }
    
})
const  cors = require("cors")
const rooms= ["general" , "tech" , "finance" , "crypto"];
const userRoutes= require("./routes/userroutes");
const { join } = require('path');
const { socket } = require('../src/context/appContext');
const User = require('./models/User');
const Message= require("./models/Message.js")






app.use(express.urlencoded({extended: true})) // to recive data from front end
app.use(express.json());
app.use(cors())  // to make front end and back end to communicate 
app.use( "/users",userRoutes);

require("./connection")




app.delete("/logout" , async(req,res)=>{

try {
    const{_id ,newMessages}=req.body;
    const user= await User.findById(_id);
    user.status="offline";
    user.newMessages= newMessages;
    await user.save();
    const members= await User.find();
    // makee all the users sees the user is logout 
    io.emit("new-user", members)

    res.status(200).send();

} catch (e) {
    console.log();
    res.status(400).send()
}



})




app.get("/rooms",(req,res)=>{
res.json(rooms)


})
// get the last messages from the room aggregate query by date 
async  function getLastMessagesFromRoom(room){
let roomMessages= await Message.aggregate([
{$match :{to:room}},
{$group:{_id:"$date" , messagesByDate:{$push:"$$ROOT"}}}


])
return roomMessages; 
}
// sort room messages by date 

function sortRoomMessagesByDate(messages){
return messages.sort(function(a,b){
let date1=a._id.split("/");
let date2=b._id.split("/"); 

date1=date1[2]+date1[0]+date1[1]
date2=date2[2]+date2[0]+date2[1]


return date1<date2 ? -1 :1

})

}






// soket connection 
// the socket are coming from the front end 
io.on("connection",(socket)=>{
//if is anew user to update the user list for all 
socket.on("new-user",async ()=>{
    const members =await User.find();
    io.emit("new-user" ,members)
})



socket.on("join-room" , async(newRoom ,previousRoom)=>{
    socket.join(newRoom);
    socket.leave(previousRoom);
    let roomMessages =await getLastMessagesFromRoom(newRoom);
    roomMessages =sortRoomMessagesByDate(roomMessages);
    socket.emit("room-messages", roomMessages)
// emit to see the message at the end 
})
// deal with messages 
socket.on ("message-room",async(room ,content,sender,time,date)=>{
    console.log("newmessage",content)
const newMessage= await Message.create({content,from:sender,time,date,to:room});
let roomMessages =await getLastMessagesFromRoom(room);
roomMessages =sortRoomMessagesByDate(roomMessages);
// sending message to room
io.to(room).emit("room-messages",roomMessages)

socket.broadcast.emit("notifications",room)

})


})



server.listen( PORT , ()=>{

    console.log("server is listening to PIRT",PORT)
})
