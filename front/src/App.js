import React, {useState, useEffect} from 'react'
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from "pusher-js"
import axios from "./axios"




function App() {
const [messages , setMessages] = useState([])
  useEffect(() => {
   axios.get("/messages/sync")
   .then(response =>{

setMessages(response.data)
   })
    });

  useEffect(() => {
    //once
    const pusher = new Pusher('80e9e9b97e69172e5da8', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('messages');/* 
    la chaine de caractere doit etre égal aux parametres du trigger dans pusher à server.js */
    channel.bind('inserted', function(data) {
      setMessages([...messages, data])

    });

   /*  return ()=>{
      channel.unbind_all()
      channel.unsubscribe()
      
    } */
  }, [messages])
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages = {messages}/>
      </div>
      {/* chat component */}
    </div>
  );
}

export default App;
