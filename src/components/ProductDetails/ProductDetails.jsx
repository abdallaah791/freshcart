import React, { useContext, useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { CartContext } from "../../context/CartContext";

export default function ProductDetails() {

  let {addProductToCart} = useContext(CartContext)
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        arrows:false,
        autoplayspeed:3000

      };
  const [product, setProduct] = useState(null); 
  const [loading, setLoading] = useState(true); 

  let { id } = useParams();

  async function getProducts(productId) {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
      console.log(data);
      setProduct(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product details:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getProducts(id);
  }, [id]); 
  return (
    <>
      <h2>ProductDetails</h2>
      {loading ? (
        <i className="fas fa-spinner fa-spin fa-4x"></i>
      ) : (
        product && (
          <div className="flex p-8 items-center">
            <div className="w-1/4">

              <Slider {...settings}>

                {product.images.map((image,index ) => <img key={index} src={image} className="w-full" alt={product.title} />
  )}
    </Slider>
              
            </div>
            <div className="w-3/4 ps-4">
              <h2>{product.title}</h2>
              <p className="m-2 text-gray-600">{product.description}</p>
              <p className="">{product.category.name}</p>

              <div className="flex justify-between ">
                  <span className="pt-10 pb-10">{product.price} EGP</span>
                  <span>    <i className=" pt-10 pb-10 fas fa-star"></i> {product.ratingsAverage}
                  </span>
                </div>
                <button onClick={()=> addProductToCart(product.id) } className="  w-full p-4 bg-white border rounded-lg shadow-sm transition-all cursor-pointer 
                             hover:bg-green-500 hover:text-white hover:shadow-lg 
                             "
                > Add To Cart
                </button>
            </div>
          </div>
        )
      )}
    </>
  );
}
