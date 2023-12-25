import { useRef, useState, useEffect } from 'react';

import { useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'

import { app } from '../firebase';

export default function Profile() {

  const fileRef = useRef(null);

  const { currentUser } = useSelector((state)=>state.user);
  const [file, setFile] = useState(undefined);

  const[filePerc, setFilePerc] = useState(0);

  const[imageUploadError, setImageUploadError] = useState(false);

  // console.log(fileRef);

  // console.log(filePerc)
  // console.log(imageUploadError);

  const[formData, setFormData] = useState({});

  // console.log(formData);
  /*
    firebase storage:
    allow read;
    allow write: if 
    request.resource.size < 2 * 1024 * 1024 &&
    request.resource.contentType.matches('image/.*');
  */

    /*
      The [file] in the dependency array of the useEffect 
      hook is a way of telling React that the effect 
      (the code inside the useEffect function) should 
      be re-executed whenever the file state changes.

      Also to ensure that the effect always has access to the latest 
      value of 'file'. If you omit file from the dependency array, 
      the effect would capture the initial value of 'file' and might 
      not reflect the most recent value when file changes.
    */
  useEffect(()=> {
    if(file) {
      handleImageUpload(file);
    }
  }, [file]);

  const handleImageUpload = (file) => {

    // Get a reference to the Firebase Storage
    const storage = getStorage(app);

    // Generate a unique file name based on the current timestamp and the original file name
    const fileName = new Date().getTime() + file.name;

    //storageRef, a variable that knows the exact locatoin of the file in the firebase storage.
    const storageRef = ref(storage,fileName);

    //Initaite an upload task with the specified file and storage reference
    const uploadTask = uploadBytesResumable(storageRef, file);
      
    // Setting up an event listener for tracking the upload state changes
    uploadTask.on('state_changed', // Event type: 'state_changed' indicates changes in the upload state
      (snapshot) => { //snapshot represents the current state of the file upload
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //console.log("Upload is"+ progress +"% done");
        setFilePerc(Math.round(progress));
      },
    
      (error) => {
        setImageUploadError(true);
      },
      ()=> {
        //to get uploaded image's url
        getDownloadURL(uploadTask.snapshot.ref).then
        ((downloadURL)=> {
          //Create a copy of the existing form data and set the avatar property to the new download URL.
          setFormData({ ... formData, avatar: downloadURL});
        })
      }
    )
  } 

  return (

    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>

      <div className='flex flex-col items-center justify-center'>

      <input  
        onChange={(e) => setFile(e.target.files[0])} 
        type="file" 
        ref={fileRef} 
        hidden 
        accept='image/*'
        />

      <p className='text-sm flex items-center justify-center'>

        {imageUploadError ? (
          <span className='text-red-700'>Error image upload(Image must be less than 2 MB)</span>
        ) : filePerc > 0 && filePerc < 100 ? (
          <span className='text-slate-700'>
            {`uploading ${filePerc}`}
          </span>
        ) : filePerc === 100 ? (
          <div className='flex items-center justify-center'>
            <span className='text-green-700 '>
              Image uploaded successfully
          </span>
          </div>
        ) : (
          ""  
      )}
      </p>
          <img onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="profile" className='rounded-full h-24 w-24 object-cover mb-20 mt-10 cursor-pointer'/>
      </div>
      <form action="" className='flex flex-col gap-4'>
        <input type="text" placeholder='email' className='border p-3 rounded-lg' value={currentUser.email} id='email'/>
        <input type="email" placeholder='username' className='border p-3 rounded-lg' value={currentUser.username} id='username'/>
        <input type="text" placeholder='password' className='border p-3 rounded-lg' id='password'/>
      </form>

        <button className='rounded-lg bg-slate-500 text-white p-3 my-6 block mx-auto w-full hover:opacity-95 disabled:opacity-80'>Update</button>
        <button className='rounded-lg bg-green-600 text-white p-3 my-3 block mx-auto w-full hover:opacity-95 disabled:opacity-80'>Create Listing</button>

      <div className='flex justify-between'>
        <button className=' text-red-600 flex justify-between cursor-pointer'>Delete account</button>
        <button className=' text-red-600 flex justify-between cursor-pointer'>Sign out</button>
      </div>

      <button className='text-center mx-auto flex my-4 text-green-500'>Show listings</button>
      
    </div>
  )
}