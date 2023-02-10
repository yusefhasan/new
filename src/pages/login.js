import React  , { useState ,useContext}from 'react'
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row ,Col,Spinner } from 'react-bootstrap'
import { useLoginUserMutation } from '../services/appApi';
import  "./login.css" 
import { Link  , Navigate, useNavigate} from 'react-router-dom';
import { AppContext } from '../context/appContext';




function Login() {

      // image upload state 
      const[email ,setemail]=useState("");
      const[password ,setpassword]=useState("");
      const navigate=useNavigate();
      const {socket}=useContext(AppContext);
      const[loginuser,{isloading , error}]= useLoginUserMutation();

function handlelogin (e){
  e.preventDefault();
  //login logic
  loginuser({email,password}).then(({data})=>{
    if(data){
      //socket work
        socket.emit("new-user")

      //navigate to chat
      navigate("/chat")
    }
  })
}
  return (
<Container className='Container'>
    <Row className='Row'>
        <Col md={7} className="login__bg"></Col>
        <Col md={4} className="d-flex flex-direction-colum align-items-center justify-content-center  zeek  ">
    <Form onSubmit={handlelogin}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        {error && <p className='alert alert-danger'> {error.data}</p>}
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"  onChange={(e)=>setemail(e.target.value)} value={email} required/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>setpassword(e.target.value)} value={password} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        {isloading ?<Spinner animation="grow"/> : "Login"}
      </Button>

      <div className='py-4'>
        <p className='text-center'>
        Dont have account ?<Link to="/signup">signup</Link>
        </p>

      </div>
    </Form>
    </Col>
    </Row>
    </Container>

  )
}

export default Login