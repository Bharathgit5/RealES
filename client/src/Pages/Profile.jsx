import {useSelector} from 'react-redux'
import { useRef, useState,useEffect } from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase';
import { updateUserStart, updateUserFailure, updateUserSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
const Profile = () => {
  const fileRef = useRef(null);
  const {currentUser, loading, error} = useSelector((state) => state.user)
  const [file, setFile] = useState(undefined)
 const [filepercent, setFilepercent] = useState(0)
 const [fileUploadError, setFileUploadError] = useState(false);
 const [FormData, setFormData] = useState({})
 const [updateSuccess, setUpdateSuccess] = useState(false)
const dispatch = useDispatch();
 console.log(FormData);
  //console.log(filepercent)
  //console.log(file)
  /*      allow read;
      allow write : if 
      request.resource.size < 2* 1024 *1024 &&
      request.resource.contentType.matches('image/.*')
      */
  useEffect ( () =>{
    if(file) {
      handleFileUpload(file);
    }
  }, [file]);
const handleFileUpload = (file) =>{
  const storage = getStorage(app);
  const fileName = new Date().getTime() + file.name;
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef,file);

  uploadTask.on('state_changed',
    (snapshot) => {
      const progress =(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setFilepercent(Math.round(progress))
   // console.log('Upload is ' + progress + '% done');
    },
(error) => {
  setFileUploadError(true);
},
() => {
  getDownloadURL(uploadTask.snapshot.ref).then

  ((dowloadURL) => setFormData ({...FormData, avatar:dowloadURL}))
}
  );
}
const handleChange = (e) =>{
  setFormData({ ...FormData, [e.target.id] : e.target.value});
};
const handleSubmit =async (e) =>{
  e.preventDefault();
  try{
 dispatch(updateUserStart());
 const res = await fetch(`/api/user/update/${currentUser._id}`,{

  method:'POST',
  headers:{
    'Content-Type':'application/json',
  },
  body:JSON.stringify(FormData),
 })
 const data = await res.json();
 if(data.success === false){
  dispatch(updateUserFailure(data.message))
  return;
 }

 dispatch(updateUserSuccess(data))
 setUpdateSuccess(true);
  }catch (error){
  dispatch(updateUserFailure(error.message))
  }
}
 
  return (
    <div className='p-3 max-w-lg mx-auto'>
 <h1 className='text-3xl font-semibold text-center my-7 '>Profile</h1>
 <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
  <input 
 onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*'/>
  <img onClick={()=> fileRef.current.click()} src={FormData.avatar || currentUser.avatar} alt="profile" 
  className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />

<p className='text-sm self-center'>
  {fileUploadError ? (
    <span className='text-red-700'>Error Image upload (image must be lessthan 2mb)</span>
  ) : filepercent > 0 && filepercent < 100 ? (
    <span className='text-slate-700'></span>
  ): filepercent === 100 ?(
    <span className='text-green-700'>Image successfully upload</span>
  ) : (
    ''
  )}
</p>


  <input type="text" placeholder='username' className='border p-3 rounded-lg'
  onChange={handleChange} id='username' defaultValue={currentUser.username} />
  <input type="email" placeholder='email' className='border p-3 rounded-lg'
   onChange={handleChange}  id='email' defaultValue={currentUser.email}/>
  <input type="password" placeholder='password' className='border p-3 rounded-lg'
   onChange={handleChange}   id='password' />
  <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase
  hover:opacity-95 disabled:opacity-85'>{loading ? 'Loading ... ': 'Update'}</button>
 </form>
 <div className='flex justify-between mt-5'>
  <span className='text-red-700 cursor-pointer'>Delect Account</span>
  <span className='text-red-700 cursor-pointer'>Sign Out</span>
 </div>
<p className='text-red-700 mt-5'>{error ? error: ''}</p>
<p className='text-green-500 mt-5'>{updateSuccess ? 'Success' : ''} </p>
    </div>
  )
}

export default Profile