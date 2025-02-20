import React, { useContext } from "react";
import style from "./Home.module.css";
import Products from "../Products/Products";
import Cart from "../Cart/Cart";
import Brands from "../Brands/Brands";
import { UserContext } from "../../context/UserContext";
import RecentProducts from "../../components/RecentProducts/RecentProducts";
import Loading from "../Loading/Loading";
import MainSlider from './../MainSlider/MainSlider';
import CategorySlider from './../CategorySlider/CategorySlider';
export default function Home() {

  return <>
  <MainSlider/>
  <CategorySlider/>
   <RecentProducts /> 
  
  
  
  </>;
}