import React, { useState } from "react";
import style from "./Layout.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer.jsx";
import { Outlet } from "react-router-dom";
export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container py-10 12 mt-6">

     <Outlet></Outlet>

      </div>
      <Footer/>
    </>
  );
}
