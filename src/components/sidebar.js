import React, { useContext, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppContext } from '../context/appContext';
import { addNotifications ,resetNotifications } from '../feature/userSlice';
import {   Col , Row } from 'react-bootstrap';
import CircleIcon from '@mui/icons-material/Circle';
import "./sidebar.css"
                        

function Sidebar() {
    const user = useSelector(state=>state.user);
    const dispatch =useDispatch()  // from redux
    const{socket,currentRoom, setCurrentRoom ,Members ,setMembers
      ,messages,setMessages,privateMemberMSg , setprivateMemberMsg,
      newMessages,setNewmessages,rooms , setRooms} =useContext(AppContext);

      function joinRoom (room ,isPuplic=true){
      if(!user){
        return alert("please login");
      }
      socket.emit("join-room" ,room , currentRoom);
      setCurrentRoom(room);
      if(isPuplic){
        setprivateMemberMsg(null)
          }
        //dispatch fot notifications
           dispatch(resetNotifications(room));
           
      }
      
      socket.off("notifications").on("notifications",(room)=>{
       if(currentRoom != room ) dispatch(addNotifications(room));
      })







    useEffect(()=>{
    if(user){
      setCurrentRoom("general");
      getRooms();
      socket.emit("join-room" ,"general")
      socket.emit("new-user")

    }


    },[]);






    socket.off("new-user").on("new-user",(payload)=>{
      setMembers(payload)
    })
      
function getRooms(){
  fetch("http://localhost:5001/rooms")
  .then((res)=>res.json())
  .then((data)=>setRooms(data));
}

// like persiststore
function orderIDs(id1,id2){
if(id1>id2){
return id1+"-"+id2;
}else{
  return id2+"-"+id1;
}

}




function handelPrivateMemberMsg (member){

setprivateMemberMsg (member) 
const roomid=orderIDs(user._id,member._id);
joinRoom(roomid, false);


}



    if(!user){
      return <></>
    }
  return (<>
  <h2>Avalible rooms</h2>
  <ListGroup className="scroll">
{rooms.map((room,idx)=>(

<ListGroup.Item key={idx} onClick={()=>joinRoom(room )} active={room===currentRoom} style={{cursor:"pointer",display:"flex",justifyContent:"space-between"   } } >
  {room} {currentRoom === room ? null : (
  <span className='badge rounded-pill bg-primary'> 
    {user.newMessages[room]}
  </span> 
)}

</ListGroup.Item>

))}
    
  <h2>Members</h2>
  {Members.map((member)=>(
    <ListGroup.Item key={member.id} style={{cursor:"pointer"}} active={privateMemberMSg?._id===member?._id} onClick={()=>handelPrivateMemberMsg(member)} disabled={member._id === user._id} >
     <Row>
      <Col xs={2} className="member-status">
        <img src={member.picture} className="member-status-img" />
        {member.status ==="online" ? (< CircleIcon className='sidebar-online-status' />) : ( < CircleIcon className='sidebar-offline-status' />)}
      </Col>

      <Col xs={9}>
      {member.name}
      {member._id === user?._id && "  (you)"}
      {member.status == "offline" && "  (offline)"}
      </Col>

     </Row>
    </ListGroup.Item>
  ))}
    </ListGroup>

  </>
 
  );
}



export default Sidebar
