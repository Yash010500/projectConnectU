import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import {Avatar, IconButton} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatIcon from '@mui/icons-material/Chat';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SidebarChat from './SidebarChat';
import db from './firebase';
import { useStateValue } from './StateProvider';

function Sidebar() {

  const [rooms,setRooms] = useState([]);
  const [{user},dispatch] = useStateValue();

  useEffect(()=>{

    const unsubsribe= db.collection('rooms').onSnapshot(snapshot=>(
      setRooms(snapshot.docs.map(doc=>({
        id:doc.id,
        data:doc.data(),
      })))
     ));
     return () =>{
      unsubsribe();
     }
  },[]);

  return (
    <div className='sidebar'>
      <div className='sidebar_header'>
            <Avatar src={user?.photoURL}/>
        <div className='sidebar_headerRight'>
            
        <IconButton>
            <ChatIcon/>
        </IconButton>
        <IconButton>
            <MoreVertIcon/>
        </IconButton>
        </div>
      </div>

      <div className='sidebar_search'>
         <div className='sidebar_searchContainer'>
         <SearchOutlinedIcon/>
         <input placeholder='Search Or Start new Chat' type='text'/>
         </div>
      </div>

      <div className='sidebar_chats'>
        <SidebarChat addNewChat/>
        {rooms.map(room=>(
          <SidebarChat key={room.id} id={room.id} name = {room.data.name} />
        ))}
      </div>

    </div>
  )
}

export default Sidebar