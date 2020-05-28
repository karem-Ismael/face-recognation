import React from 'react'
import './FaceRecognation.css'
   const FaceRecognation=({image,box})=> {
    return (
        <div className="center ma"> 
        <div className="mt2 absolute">
            <img id='imgrecognation' src={image} width='500px' height='auto'/>
            <div className="boundery-box" style={{top:box.toprow,right:box.rightcol,bottom:box.bottomrow,left:box.leftcol}}></div>
        </div>     
        </div>
    )
}
export default FaceRecognation
