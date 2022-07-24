import MoreVert from '@mui/icons-material/MoreVert';
import { Avatar, IconButton } from '@mui/material';
import React, { useState ,useEffect} from 'react';
import './Chat.css';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import {useParams} from "react-router-dom";
import db from './firebase';
import firebase from 'firebase/compat/app';
import {useStateValue} from "./StateProvider";

function Chat() {

    const [input,setinput] = useState("");
    const {roomId} = useParams();
    const [roomName,setRoomName] = useState("");
    const [message,setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();
    useEffect(() => {
    
      if(roomId){
        db.collection('rooms').doc(roomId).onSnapshot(snapshot =>(
          setRoomName(snapshot.data().name)
        ))

        db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp','asc').onSnapshot(snapshot =>(
          setMessages(snapshot.docs.map(doc => doc.data()))
        ))
      }
    }, [roomId])
    
    
    const sendMessage = (e) =>{
        e.preventDefault();
        console.log(input);

        db.collections('rooms').doc(roomId).collection('messages').add({
          message:input,
          name: user.displayName,
          timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        })

        setinput("");
    };
 
  return (

    <div className='chat'>
      <div className='chat_header'>
        <Avatar/> 
        <div className='chat_headerInfo'>
            <h3>{roomName}</h3>
            <p>Last Seen...</p>
        </div>
        <div className='chat_headerRight'>
            <IconButton>
                <SearchOutlined/>
            </IconButton>
            <IconButton>
                <AttachFileIcon/>
            </IconButton>
            <IconButton>
                <MoreVert/>
            </IconButton>
        </div>
      </div>
      <div className='chat_body'>
        {message.map(message =>(
          <p className={`chat_message ${true &&"chat_receiver"}`}>
       <span className='chat_name'>{message.name}</span>
        {message.message}
       <span className='chat_timestamp'>
       {new Date(message.timestamp?.toDate()).toUTCString()}
       </span>
       </p>
        ))}
      </div>
      <div className='chat_footer'>
        
        <IconButton>
         <InsertEmoticonIcon/>
        </IconButton>
        <form>
            <input value={input} onChange={e  => setinput(e.target.value)} placeholder='Message' type="text"/>
            <button onClick={sendMessage} 
            type='submit'>Send a message</button>
        </form>
      </div>
    </div>
  )
}

export default Chat;