import React from 'react';
import './Login.css';
import img1 from './images/logo.png';
import { Button } from '@mui/material';
import {auth,googleProvider} from './firebase';
import  {signInWithPopup} from "firebase/auth";
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';


function Login() {
   
    const [{},dispatch] = useStateValue();

    const signInWithGoogle = () => {
        signInWithPopup(auth,googleProvider).then((result)=>{
            dispatch({
                type:actionTypes.SET_USER,
                user:result.user,
            })
        }).catch((error)=>alert(error.message));
      };
  return (
    <div className='login'>
      <div className='login_container'>
        <img src={img1} alt="App Logo"/>
        <div className='login_text'>
            <h1>Lets Connect</h1>
        </div>
        <Button type="submit" onClick={signInWithGoogle}>
            Sign In With Google
        </Button>
      </div>
    </div>
  );
}

export default Login;