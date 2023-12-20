import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

export default function SignUp() {

  const[formData, setFormData] = useState({});

  const[error, setError] = useState(null);
  const[loading, setloading] = useState(false);

  const[loading2, setloading2] = useState(false);
  
  const navigate = useNavigate();



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
        
        setloading(true);
  
        const res = await fetch("/api/user/auth/signup",
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
          });
  
          const data = await res.json();
  
          if(data.success === false) {
            setloading(false);
            setError(data.message);
            return;
          }
          setloading(false);
          setError(null);

          navigate('/sign-in');
          console.log(data);
        } catch(error) {
          setloading(false);
          setError(error.message);
      }

  }


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>

      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} placeholder='username' className='border p-3 rounded-lg' id='username'/>
        <input type="email" onChange={handleChange} placeholder='email' className='border p-3 rounded-lg' id='email'/>
        <input type="password" onChange={handleChange} placeholder='password' className='border p-3 rounded-lg' id='password'/>

        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
        
          {loading ? 'Loading...': 'Sign Up'}
        </button>

      </form>

      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>

        <Link to='/sign-in'>
          <span className='text-blue-700 '>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}