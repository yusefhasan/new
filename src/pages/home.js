import React from 'react'
import { Row ,Col ,Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import ChatIcon from '@mui/icons-material/Chat';
import Background from '../assets/background.jpg';

import "./Home.css"
function home() {
  return (
<Row >

<Col md={6} className="d-flex flex-direction-colum align-items-center justify-content-center  zeek  ">
<div>
<h1>Chat and have fun with your friends </h1>
<p>Chat App let you connect with the world</p>
<LinkContainer to="/chat" >
  <Button variant='success' >Start Chat <ChatIcon className='icon'/>

  </Button>
</LinkContainer>


</div>
 <Col  md={4}  className="between "> <img className="home__bg" alt='nothing' src ={Background}/></Col>
 </Col>




</Row>



    )
}

export default home