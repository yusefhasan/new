import React, { useState } from 'react'
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row ,Col } from 'react-bootstrap'
import { Link , useNavigate} from 'react-router-dom';
import ME from '../assets/me.png';
import UploadIcon from '@mui/icons-material/Upload';
import "./signup.css"
import {useSignupUserMutation} from "../services/appApi"
import  "./login.css" 








function Signup() {
    const[email ,setemail]=useState("");
    const[password ,setpassword]=useState("");
    const[name ,setname]=useState("");
    const [signupUser , { isLoading, error}] = useSignupUserMutation();
    const navigate=useNavigate();
    // image upload state 
    const[image ,setimage]=useState(null);
    const[uploading ,setuploading]=useState(false);
    const[preview ,setpreview]=useState(null);

 



    function validateimg (e){
        const file =e.target.files[0];
        if(file.size>=1048576){
        
        return alert("max file size is 1MB")
        }else{
        setimage(file);
        setpreview(URL.createObjectURL(file));
            
        }
        
        
        }

        async  function uploadimage(){
          const data =new FormData();
          data.append("file" , image);
          data.append("upload_preset","nlsayazd");
          try {
            setuploading(true);
            let  res = await fetch("https://api.cloudinary.com/v1_1/dnxmrui2k/image/upload",{
              method :"post",  
              body:data, 
       
      
            });
           const urlData =await res.json();
           setuploading(false);
           return urlData.url
          }catch(error){
            setuploading(false);
            console.log(error);
      
          }
          };

        async  function handlesignup(e){
          e.preventDefault();
          if(!image) return alert(" please upload your image ");
          const url = await uploadimage(image);
          console.log(url);
          // sign up the user
          signupUser({name,email,password,picture:url}).then(({data})=>{
              if(data){
                console.log(data);
                navigate("/chat")

              }

          })
          };
        
 
  

  
        
        return (
    <Container className='Container'>
    <Row className='Row'>
        <Col md={7} className="login__bg"></Col>
        <Col md={4} className="d-flex flex-direction-colum align-items-center justify-content-center  zeek  ">
    <Form onSubmit={handlesignup}>
      <h1 className='text-center'> Create account</h1>
      <div className='signup-profile-pic__container'>
        <img src={ preview || ME} className='signup-profile-pic' alt='asd'/>
        <label htmlFor='image-upload' className='image-upload-label'>
        <UploadIcon className='uploadicon'/>

        </label>
        <input type="file" id='image-upload' hidden accept='image/png , image/jpg' onChange={validateimg}/>

      </div>    
      {error && <p className='alert alert-danger'> {error.data}</p>}
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter your name " onChange={(e)=>setname(e.target.value)} value={name}/>
   
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"  onChange={(e)=>setemail(e.target.value)} value={email}/>
    
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>setpassword(e.target.value)} value={password}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="success" type="submit">
        {uploading || isLoading ? "signing you up" : "sign up"}
      </Button>
      <div className='py-4'>
        <p className='text-center'>
        you already have account ?<Link to="/login">login</Link>
        </p>

        </div>

    </Form>
    </Col>
    </Row>
    </Container>
  )
}

export default Signup