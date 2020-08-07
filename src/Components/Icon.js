import React from 'react'
import sprite from '../sprite.svg'
export default function Icon(props) {
    let border = 'none'
    if (props.border) {border = '4px solid black'}
    return(
        <div 
            style={{
                display: 'inline-block',
                background: 'var(--gradient-main)',
                borderRadius: '100%',
                padding: props.padding || '11px',
                boxShadow: 'var(--box-shadow)',
                border: border

            }}>
            <svg 
                style={{
                    display: 'block',
                    fill: 'black',
                    height: props.size || '1rem',
                    width: props.size || '1rem'
                }}>
                <use href={sprite + "#icon-" + props.iconName} ></use>
            </svg>
        </div>
    )
}