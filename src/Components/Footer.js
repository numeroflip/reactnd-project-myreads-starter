import styled from 'styled-components'
import Icon from './Icon'
import React from 'react';

const FooterWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    color: gray;
    height: 4rem;
    margin-top: 3rem;
    background-color: black;

    & > * {
        margin: 0 0.5rem;
    }
`

export default function Footer(props) {
    return(
        <FooterWrapper>
            {props.children}
            <a href='https://github.com/numeroflip' target='_blank' rel="noopener noreferrer">
                <Icon iconName='github' size='20px' />
            </a>
            <a href='https://www.linkedin.com/in/aron-berenyi/' target='_blank' rel="noopener noreferrer">
                <Icon size='20px' iconName='linkedin' />
            </a>
        </FooterWrapper>
    )
}