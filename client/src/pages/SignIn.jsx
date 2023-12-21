import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'; //redux hooks

import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';

export default function SignIn() {

  const[formData, setFormData] = useState({});

  // const[error, setError] = useState(null);
  // const[loading, setloading] = useState(false);

  const {loading, error} = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  console.log(formData);

  const handleSubmit = async(e) => {
      e.preventDefault();
      
      try {
        
        //setloading(true);
        dispatch(signInStart());
        const res = await fetch("/api/user/auth/signin",
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
          });
          
          const data = await res.json();
          
          console.log(data);
          
          if(data.success === false) {
            // setloading(false);
            // setError(data.message);

            dispatch(signInFailure(data.message));
            return; 
            // the render method's returned JSX is returned to React, 
            //which then uses this information to determine how the 
            //component should be rendered.
          }
          // setloading(false);
          // setError(null);
          dispatch(signInSuccess(data));
          
          navigate('/');
          console.log(data);
        } catch(error) {
          // setloading(false);
          // setError(error.message);
          dispatch(signInFailure(error.message));
      }
  }


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>

      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        
        <input type="email" onChange={handleChange} placeholder='email' className='border p-3 rounded-lg' id='email'/>
        <input type="password" onChange={handleChange} placeholder='password' className='border p-3 rounded-lg' id='password'/>

        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
        
          {loading ? 'Loading...': 'Sign In'}
        </button>

      </form>

      <div className='flex gap-2 mt-5'>
        <p>Don't have an account?</p>

        <Link to='/sign-up'>
          <span className='text-blue-700 '>Sign Up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}