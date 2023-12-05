import React, { useEffect } from 'react';

import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from "../firebase";
import { FcGoogle } from "react-icons/fc";
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';

export default function OAUTH() {
    const navigate = useNavigate();
   async function onGoogleClick(){
    try{
     const auth = getAuth();
     const provider = new GoogleAuthProvider();
     const result = await signInWithPopup(auth,provider);
      const user = result.user;
      
      // check krra hai ki user exist krta hai ki nhi
      const docRef = doc(db,"users",user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(doc(db,"users",user.uid),{
          name:user.displayName,
          email:user.email,
          timestamp:serverTimestamp(),
        });
      }

      navigate("/");

    } catch(error){
       toast.error("Could not sign in with google");
       
    }
  }
  return (
    <button type="button" onClick={onGoogleClick} className=" flex items-center justify-center w-full bg-red-700 text-white px-7 py-3 uppercase text-sm font-medium hover:bg-red-800 active:bg-red-900 shadow-md hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out">
      <FcGoogle className="text-2xl bg-white rounded-full mr-2"/>
      Continue with Google
    </button>
  )
}
