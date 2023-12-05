import React, { useState, useEffect } from 'react';
import logo from "../assets/svg/logo.jpg";
import {Link, useLocation,useNavigate} from "react-router-dom";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
export default function Header() {
    const [pageState, setPageState] = useState("Sign in");
    const location = useLocation();
    const auth = getAuth();
    const navigate = useNavigate();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setPageState("Profile");
          } else {
            setPageState("Sign in");
          }
        });
    },[auth])
    function pathMatchRoute(route){
        if (route === location.pathname) {
            return true;
        }
    }
  return (
    <div  className="bg-white border-b shadow-sm sticky top-0 z-10">
        <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
            <div className="">
                <img src={logo} alt="logo" className="h-5 cursor-pointer scale-[228%] " onClick={()=>navigate("/")} />
            </div>
            <div>
                <ul className="flex space-x-10">
                    <li className={`  cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-transparent    ${pathMatchRoute("/") && "text-black border-b-red-500"}`} onClick={()=>navigate("/")}>Home</li>
                    <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-transparent    ${pathMatchRoute("/offers") && "text-black border-b-red-500"}`} onClick={()=>navigate("/offers")}>Offers</li>
                    <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-transparent   ${(pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) && "text-black border-b-red-500"}`} onClick={()=>navigate("/profile")}>{pageState}</li>
                    <a href="https://alkush-pipania.github.io/portfolio/" rel="noopener" target="_blank" className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-transparent hover:text-gray-500 active:text-red-600 ` }>About us</a>
                   
                    
                </ul>
            </div>
        </header>
    </div>
  )
}
