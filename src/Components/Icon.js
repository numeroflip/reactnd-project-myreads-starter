import React from 'react'
import styled, {css} from 'styled-components'
import sprite from '../sprite.svg'

const IconWrapper = styled.div`
    display: inline-block;
    background: var(--gradient-main);
    border-radius: 100%;
    padding: ${({padding}) => padding || '11px'};
    box-shadow: var(--box-shadow);
    transition: all .2s;

    &:hover {
        transform: scale(1.05);
    }


    ${({border}) => border && css`
        border: 4px solid black
    `
    }
`

const Svg = styled.svg`
    display: block;
    fill: black;
    height: ${({ size }) => size || '1rem'};
    width: ${({ size }) => size || '1rem'};
`

export default function Icon(props) {
    const {name, padding, size, border} = props;
    return(
        <IconWrapper border={border} padding={padding}>
            <Svg name={name}  size={size}>
                <use href={sprite + "#icon-" + props.iconName} ></use>
            </Svg>
        </IconWrapper>
    )
}