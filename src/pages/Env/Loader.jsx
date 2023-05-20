import React from 'react';
import MoonLoader from "react-spinners/MoonLoader";
import './Loader.css';
const Loader = () => {
  return   <div className="loader-container">
                 <div className="loader" >
                     <MoonLoader  color="#36d7b7"
  speedMultiplier={1}  />
                
                 </div>
            </div>
}
export default Loader;
