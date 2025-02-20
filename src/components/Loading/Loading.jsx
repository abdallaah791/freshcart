import React, { useState } from 'react'
import {BounceLoader} from "react-spinners";


const override={
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  


export default function Loading() {




    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");
  


  return <>
  
  <div className="sweet-loading py-10">
      
      <BounceLoader
        color={'#0aad0a'}
        loading={loading}
        cssOverride={override}
        size={70}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  
  </>
  
}
