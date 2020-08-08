import React from 'react'
import styled from 'styled-components'

const HeaderWrapper = styled.div`
    display: flex;
    align-items: stretch;
    justify-content: center;
    padding: 10px 0;
    margin-bottom: 4rem;
    text-align: center;
`
const Title = styled.h1`
    padding: 1rem 2rem;
    display: inline-block;
    font-weight: 800;
    font-size: 2rem;
    border-bottom: 4px solid black;
    margin: 0;
    
`
export default function Header(props) {
    return(
        <HeaderWrapper>
            <Title>MyReads</Title>
        </HeaderWrapper>
    )
}