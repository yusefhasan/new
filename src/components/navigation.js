import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../assets/chat.png';
import { Button } from 'react-bootstrap';
import { useLogoutUserMutation } from '../services/appApi';
function Navigation() {
  const user=useSelector((state)=>state.user);
const[logoutUser]=useLogoutUserMutation();
 async function handellogout(e){
      e.preventDefault();
    await logoutUser(user);
    
    // redirect to the home page 
     window.location.replace("/");
  }
  return (
   
    

        <Navbar bg="success" variant='dark' expand="lg">
          <Container>

            <LinkContainer to="/">
            
            <Navbar.Brand href="#home">
              <img src={logo} style={{width:50 , height:50}}  alt="nothing"/>
            </Navbar.Brand>
            </LinkContainer>


            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                {!user &&( 

                  <LinkContainer to="/login">
                <Nav.Link>login</Nav.Link>
                </LinkContainer>
                  )}
                <LinkContainer to="/Chat">
                <Nav.Link>chat</Nav.Link>
                </LinkContainer >
                {user &&(
                  <NavDropdown title={
                    <>
                    
                    <img src={user.picture} style={{width:40 ,height:40 ,marginRight:10,objectFit:"cover",borderRadius:"50%" }}/>
                    {user.name}
                    </>

                  } id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item >
                   <Button variant='danger' onClick={handellogout}>
                    logout
                   </Button>
                  </NavDropdown.Item>
                </NavDropdown>
                  )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    
    
      
}

export default Navigation