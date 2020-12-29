import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from '@material-ui/icons';
import { Avatar, IconButton } from '@material-ui/core'
import React, {useState} from 'react'
import "./Chat.css"
import MicOutlinedIcon from '@material-ui/icons/MicOutlined';
import axios from "./axios"



function Chat({messages}) {


    const [input, setInput] = useState("")
    const sendMessage = async (e) =>{
        e.preventDefault()

        await axios.post('/messages/new',{
            message:input,
            name: "DEMO APP",
            timestamps:"maintenant",
            received: false
        })
        setInput("")
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar />

                <div className="chat__headerInfo">
                    <h3>Room name</h3>
                    <p>last seen ....</p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>


            <div className="chat__body">
                {messages.map(message =>(
                    <p className= {`chat__message ${message.received} && "chat_reciever"` }>
                    <span className="chat__name">{message.name}
                    </span>
                    {message.message}
                    <span className="chat__timestamp">{message.timestamps}</span>
                </p>
                ))}
                
                <p className="chat__message chat__reciever">
                    <span className="chat__name">Selim ozkan
                    </span>
                    This is a message 
                    <span className="chat__timestamp">{new Date().toUTCString()}
                    </span>
                </p>
                <p className="chat__message">
                    <span className="chat__name">Selim ozkan
                    </span>
                    This is a message 
                    <span className="chat__timestamp">{new Date().toUTCString()}
                    </span>
                </p>
                <p className="chat__message chat__reciever">
                    <span className="chat__name">Selim ozkan
                    </span>
                    This is a message 
                    <span className="chat__timestamp">{new Date().toUTCString()}
                    </span>
                </p>
            </div>

            <div className="chat__footer">
                <InsertEmoticon />

                <form action="">
                    <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message"
                    type="text"/>

                    <button onClick={sendMessage} 
                    type="submit">
                        Send a message
                    </button>
                </form>
                <MicOutlinedIcon />
            </div>
            
        </div>
    )
}

export default Chat
