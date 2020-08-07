import React from 'react'
export default function BookImg(props) {
    const {imgURL} = props;
    return(
        <div 
            className="book-cover" 
            style={{ 
                width: 128, 
                height: 193, 
                backgroundImage: `url(${imgURL})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        />

    )
}