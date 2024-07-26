import {useSelector} from 'react-redux'
import { useRef, useState,useEffect } from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase';

const Profile = () => {
  const fileRef = useRef(null);
  const {currentUser} = useSelector((state) => state.user)
  const [file, setFile] = useState(undefined)
 const [filepercent, setFilepercent] = useState(0)
 const [fileUploadError, setFileUploadError] = useState(false);
 const [FormData, setFormData] = useState({})
 //console.log(FormData);
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


 
  return (
    <div className='p-3 max-w-lg mx-auto'>
 <h1 className='text-3xl font-semibold text-center my-7 '>Profile</h1>
 <form className='flex flex-col gap-6'>
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


  <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username'/>
  <input type="text" placeholder='email' className='border p-3 rounded-lg' id='email'/>
  <input type="text" placeholder='password' className='border p-3 rounded-lg'  id='password'/>
  <button className='bg-slate-700 text-white rounded-lg p-3 uppercase
  hover:opacity-95 disabled:opacity-85'>update</button>
 </form>
 <div className='flex justify-between mt-5'>
  <span className='text-red-700 cursor-pointer'>Delect Account</span>
  <span className='text-red-700 cursor-pointer'>Sign Out</span>
 </div>
    </div>
  )
}

export default Profile