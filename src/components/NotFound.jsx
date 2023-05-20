import React from "react";
import background from "../assets/sphere.webm";

const NotFound = () => {
  return (

      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",

          top: 0,

          left: 0,

          width: "100%",

          height: "100%",
        }}
      >
        <source src={background} type="video/mp4" />
        {" "}
        
      </video>
   
  );
};

export default NotFound;
