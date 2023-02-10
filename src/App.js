import './App.css';
import Navigation from './components/navigation';
import { BrowserRouter,Routes , Route  } from 'react-router-dom';
import Home from "./pages/home.js"
import Login from './pages/login';
import Signup from "./pages/signup"
import Chat from './pages/chat';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { AppContext ,socket  } from './context/appContext.js';
function App() {
  const [rooms , setRooms]=useState([]);
  const [currentRoom, setCurrentRoom]=useState([]);
  const [Members ,setMembers]=useState([]);
  const [messages,setMessages]=useState([]);
  const [privateMemberMSg , setprivateMemberMsg]=useState([])
  const [newMessages,setNewmessages]=useState([])

  const user =useSelector((state)=>state.user)
  return (  
  <div>

    <AppContext.Provider value={{ socket , currentRoom, setCurrentRoom ,Members ,setMembers
      ,messages,setMessages,privateMemberMSg , setprivateMemberMsg,
      newMessages,setNewmessages,rooms , setRooms}}>
    <BrowserRouter>    
     <Navigation/>
        <Routes>
<Route path='/' element={<Home/>}/>
{!user&&(
  <>
  <Route path='/login' element={<Login/>}/>
<Route path='/signup' element={<Signup/>}/>
</>
)}
<Route path='/chat' element={<Chat/>}/>


        </Routes>


</BrowserRouter>

</AppContext.Provider>

  </div>
  )
}

export default App;
