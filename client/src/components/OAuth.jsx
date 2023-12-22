import React from 'react'

import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase';

import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';

import { useNavigate } from 'react-router-dom';

export default function OAuth() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async() => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            
            const result = await signInWithPopup(auth, provider);

            //console.log(result);
            
            //to send the user info to server
            const res = await fetch('/api/user/auth/google', {
                method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({name: result.user.displayName, email: result.user.email, 
                    photo: result.user.photoURL}),
                })
                const data = await res.json();
                dispatch(signInSuccess(data));
                navigate('/');
                
        } catch (error) {
            console.log("Could not Sign in with Google", error);
        }
    };

  return (
    <button type='button' onClick={handleGoogleClick} className='bg-red-700 p-3 text-white rounded-lg hover:opacity-95 shadow-inner '>
      Continue With Google
    </button>
  )
}
