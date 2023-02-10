import React from 'react'
import { Container ,Row ,Col} from 'react-bootstrap'
import Sidebar from '../components/sidebar'
import Messageform from '../components/messageform'
function chat() {
  return (
    <Container>
    <Row>
    <Col md={4}> 
    <Sidebar/>
   
    </Col>
   <Col md={8}>
   <Messageform/>
   </Col>




    </Row>

    </Container>
  )
}

export default chat