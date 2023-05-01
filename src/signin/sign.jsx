import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "./nobgsh.png";

import { Route, Routes, Navigate } from "react-router-dom";
import Signin from "./signin";
import Signup from "./signup";
export default function Sign() {
  return (
    <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2 grid-rows-1 px-0 dark:bg-slate-800">
      <Routes>
        <Route exact path="/sign/*" element={<Signin />} />
        <Route exact path="/sign/signup" element={<Signup />} />
        <Route exact path="*" element={<Signin/>} />
      </Routes>
      <div className="bg-gray-100 hidden md:flex justify-center items-center dark:bg-slate-400">
        <img src={logo}></img>
      </div>
      <ToastContainer />
    </div>
  );
}
