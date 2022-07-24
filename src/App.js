import React, { useState } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from './Login';
import { useStateValue } from './StateProvider';


function App() {

  const [{user},dispatch] = useStateValue();

  return (
    <div className="app">
     
     {!user ?(
      <Login/>
     ):(
      <div className='app_body'>
      
    <BrowserRouter>
       
      <Routes>
        <Route path="/rooms/:roomId" element={<><Sidebar/><Chat/></>} />
        <Route path="/" element={<><Sidebar/><Chat/></>}/>
      </Routes>


    </BrowserRouter>

      </div>)}
    </div>
  );
}

export default App;
