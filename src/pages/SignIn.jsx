import React, { useState } from 'react';
import ecom from "./ecom.json";
import { Link } from 'react-router-dom';

import {AiFillEyeInvisible,AiFillEye} from "react-icons/ai";
import Lottie from "lottie-react";
import OAUTH from '../components/OAUTH';
import { signInWithEmailAndPassword,getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; 
export default function SignIN() {

    const [showPassword, setShowPassword] = useState(false);
    const[formData,setFormData] = useState({
        email:"",
        password:"",
    });
    const {email,password} = formData;
    const navigate = useNavigate();
    function onChange(e){
        setFormData((prevState)=>({
          ...prevState,
          [e.target.id]: e.target.value,
        }));
    }
    async function onSubmit(e){
      e.preventDefault()
      try{
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if(userCredential.user){
          navigate("/");
        }
      }
      catch(error){
        toast.error("password or email is incorrect")
      }
    }
  return (
    <section >
        <h1 className="text-3xl text-center mt-6 font-bold">Sign In</h1>
        <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-[6xl] mx-auto">
            <div className="md:w-[65%] lg:w-[50%] mb-[12px] md:mb-[6px] ">
            <Lottie  animationData={ecom} className="w-full" />
            </div>
            <div className="w-full md:w-[67] lg:w-[40%] lg:ml-5">
                <form onSubmit={onSubmit}>
                 <input className="w-full px-4 py-2 text-gray-600 bg-slate-200  font-semibold border-transparent mb-6 rounded-2xl " type="email" id="email" value={email}  placeholder="E-mail" onChange={onChange} />
                 <div className="relative mb-6">
                   <input className="w-full px-4 py-2 text-gray-600 bg-slate-200  font-semibold border-transparent rounded-2xl " type={showPassword ? "text": "password"} id="password" value={password}  placeholder="password" onChange={onChange} />
                   {showPassword ? (<AiFillEyeInvisible className="absolute right-3 top-3 text-xl cursor-pointer" onClick={()=>setShowPassword((prevState)=>!prevState)}/>): (<AiFillEye  className="absolute right-3 top-3 text-xl cursor-pointer" onClick={()=>setShowPassword((prevState)=>!prevState)} />)}
                 </div>
                  <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
                    <p className="mb-6">Don't have a account?
                      <Link to="/sign-up" className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1">Register</Link>
                    </p>
                    <p>
                      <Link to="/Forgot-password" className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out ">Forgot password</Link>
                    </p>
                    
                  </div>
                  <button className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800  " type="submit">Sign in</button>
                <div className=" flex items-center my-4 before:border-t before:flex-1  before:border-gray-300 after:border-t after:flex-1  after:border-gray-300">
                <p className="text-center font-semibold mx-4">OR</p>
                </div>
                <OAUTH/>
                </form>
                
            </div>
        </div>
    </section>

  )
}
