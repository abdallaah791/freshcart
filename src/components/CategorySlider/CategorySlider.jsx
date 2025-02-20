import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Categories from './../Catrgories/Categories';
import Slider from 'react-slick';

export default function CategorySlider() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 8 ,
        slidesToScroll: 1,
        autoplay:true,
        arrows:false,
        autoplayspeed:3000

      };
  
    const [Categories, setCategories] = useState([])

  async function getCategories () {
    
   let {data }= await axios.get(' https://ecommerce.routemisr.com/api/v1/categories');

    // console.log(data);
    setCategories(data.data)
  }
  useEffect(()=>{

  getCategories();


  } , [])
  
  return <>
  
  
  <Slider {...settings}>

{Categories.map((category,index ) => <div key={index} className='my-3'> <img  src={category.image} alt={category.name} className='  px-1 w-full h-[200px] object-cover object-top' />
<h3>{category.name} </h3>
</div>  )}
</Slider>
  
  
  
  
  
  </>
}
