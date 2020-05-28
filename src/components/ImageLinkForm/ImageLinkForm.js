import React from 'react'
import './ImageLinkForm.css'
   const ImageLinkForm=({onInputchange,onButtonsubmit})=> {
    return (
        <div>
            <p className="f3 center">
                {'this is magic brain detect the face try it !'}
            </p>
            <div className="center">  
            <div className="pa4 form center br3 shadow-5">
            <input  className="f4  pa2 w-70 center"type="text" onChange={onInputchange} />
                <button className="w-30 grow f4 link pb3 pv2 dib white bg-light-purple "onClick={onButtonsubmit}>Detect</button>
            </div>
               
            </div>
            
        </div>
    )
}
export default ImageLinkForm
