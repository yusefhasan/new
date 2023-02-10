import React, { useContext, useEffect, useRef, useState } from 'react'
import { Form  ,Col , Row, Button} from 'react-bootstrap';
import SendIcon from '@mui/icons-material/Send';
import "./MessageForm.css"
import { useSelector } from 'react-redux';
import { AppContext } from '../context/appContext';

function Messageform() {
  const user =useSelector((state)=>state.user);
  const {socket,currentRoom,messages,setMessages,privateMemberMSg}=useContext(AppContext);
  const messageEndRef=useRef(null)
  useEffect(()=>{
   scrollToBottom()

  },[messages])




  const [message,setMessage]=useState("");

function getFormattedDate(){

  const date=new Date();
  const year=date.getFullYear();
  let month=(1+date.getMonth()).toString();

  month=month.length>1 ? month :"0"+month;

   let day=date.getDate().toString();

 day= day.length> 1 ? day :"0"+day;
return month +"/" +day +"/"+year;



}
function scrollToBottom(){
  messageEndRef.current?.scrollIntoView({ behavior:"smooth"});
}

const todayDate=getFormattedDate();

socket.off("room-messages").on("room-messages",(roomMessages)=>{
  setMessages(roomMessages);
  console.log("room messages" ,roomMessages)

})

    function handleSubmit(e){
    e.preventDefault();
    if(!message) return ;
    const today=new Date();
    const minutes= today.getMinutes()<10 ? "0" +today.getMinutes :today.getMinutes();
    const time =today.getHours()+ ":"+minutes;
    const roomid= currentRoom;
    socket.emit("message-room",roomid,message,user,time,todayDate);
    setMessage("")

  }



  return (
              <div>
                <div className='messages-output'>
                {user && !privateMemberMSg?._id && <div className='alert alert-info  stick'>you are in the {currentRoom} room</div>}
                {user && privateMemberMSg?._id && (
                  <>
                    <div className='alert alert-info conversation-info'>
                      <div>

                        Your conversation With {privateMemberMSg.name}<img src={privateMemberMSg.picture} className="conversation-profile-picture"/>

                      </div>



                    </div>



                  </>
                )}
                  {!user&&<div className='alert alert-danger'>please login </div>}
                  {user && messages.map(({_id:date,messagesByDate},idx)=>(
                      <div key={idx}>
                      <p className='alert alert-info text-center message-date-indicator'>{date} </p>
                         {messagesByDate?.map(({content,time,from:sender},msgIdx)=>(
                    <div className={sender?.email==user?.email ? "message" :"incoming-message"} key={msgIdx}>
                      <div className='message-inner'>
                        <div className='d-flex align-items-center mb-3'>
                          <img src={sender.picture} style={{width:35 ,height:35 , objectFit:"cover" , borderRadius:"50%" , marginRight:10}} />
                          <p className='message-sender' >{sender._id == user?._id ?"YOU" :sender.name}</p>
                        </div>
                        <p className='message-content'>{content}</p>
                        <p className='message-timestamp-left'>{time}</p>
                      </div>
                    </div>

                  ))}

                    </div>
              


  ))}
  <div ref={messageEndRef}></div>
</div>



                    <Form onSubmit={handleSubmit}>
                    <Row>
                    <Col md={11}>
                        <Form.Group>
                        <Form.Control type='text' placeholder='You message ' disabled={!user} value={message} onChange={(e)=>setMessage(e.target.value)}></Form.Control>
                        </Form.Group>
                    
                    
                    </Col>
                    <Col md={1}>
                        <Button variant='primary' type="submit "  style={{width:"100%" , backgroundColor:"#198754"}} disabled={!user}>
                        <SendIcon/>
                            </Button>
                    </Col>




                    </Row>



                    </Form>
                
                
                
                
                
                
                
    </div>
    
  )
}

export default Messageform