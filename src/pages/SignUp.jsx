import React, { useState } from 'react';
import ecom from "./ecom.json";
import { Link } from 'react-router-dom';

import {AiFillEyeInvisible,AiFillEye} from "react-icons/ai";
import Lottie from "lottie-react";
import OAUTH from '../components/OAUTH';
import {getAuth,createUserWithEmailAndPassword,updateProfile} from "firebase/auth";
import {db} from "../firebase";
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';   
import { toast } from 'react-toastify';
export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const[formData,setFormData] = useState({
        name:"",
        email:"",
        password:"",
    });
    const {name,email,password} = formData;
    const navigate = useNavigate();
    function onChange(e){
        setFormData((prevState)=>({
          ...prevState,
          [e.target.id]: e.target.value,
        }));
    }
   async function onSubmit(e){
   e.preventDefault()
   try {
      const auth = getAuth();
      
      const userCredentials = await
      createUserWithEmailAndPassword(
        auth,
        email,
        password
        );
        updateProfile(auth.currentUser,{
          displayName:name
        });
        
      const user = userCredentials.user;
      const formDataCopy = {...formData};
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp  ();
       
      await setDoc(doc(db,"users",user.uid),formDataCopy);
      toast.success("Account created successfully");
      navigate("/");
   } catch (error) {
      toast.error("something went wrong");
   }
  }
  return (
    <section >
        <h1 className="text-3xl text-center mt-6 font-bold">Sign Up</h1>
        <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-[6xl] mx-auto">
            <div className="md:w-[65%] lg:w-[50%] mb-[12px] md:mb-[6px] ">
            <Lottie  animationData={ecom} className="w-full" />
            </div>
            <div className="w-full md:w-[67] lg:w-[40%] lg:ml-5">
                <form onSubmit={onSubmit}>
                <input className="w-full px-4 py-2 text-gray-600 bg-slate-200  font-semibold border-transparent mb-6 rounded-2xl " type="text" id="name" value={name}  placeholder="Full name" onChange={onChange} />
                 <input className="w-full px-4 py-2 text-gray-600 bg-slate-200  font-semibold border-transparent mb-6 rounded-2xl " type="email" id="email" value={email}  placeholder="E-mail" onChange={onChange} />
                 <div className="relative mb-6">
                   <input className="w-full px-4 py-2 text-gray-600 bg-slate-200  font-semibold border-transparent rounded-2xl " type={showPassword ? "text": "password"} id="password" value={password}  placeholder="password" onChange={onChange} />
                   {showPassword ? (<AiFillEyeInvisible className="absolute right-3 top-3 text-xl cursor-pointer" onClick={()=>setShowPassword((prevState)=>!prevState)}/>): (<AiFillEye  className="absolute right-3 top-3 text-xl cursor-pointer" onClick={()=>setShowPassword((prevState)=>!prevState)} />)}
                 </div>
                  <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
                    <p className="mb-6">Have a account?
                      <Link to="/sign-in" className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1">Sign in</Link>
                    </p>
                    <p>
                      <Link to="/Forgot-password" className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out ">Forgot password</Link>
                    </p>
                    
                  </div>
                  <button className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800  " type="submit">Sign Up</button>
                <div className=" flex items-center my-4 before:border-t before:flex-1  before:border-gray-300 after:border-t after:flex-1  after:border-gray-300">
                <p className="text-center font-semibold mx-4">OR</p>
                </div>
                <OAUTH />
                </form>
                
            </div>
        </div>
    </section>

  )
}
