import React from 'react'
import Title from './Title'
import Books from './Books'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import Icon from './Icon'

const Bookshelf = styled.div`
    padding: 0 10px 20px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;


    @media (min-width: 600px) {
        padding: 0 20px 40px;
    }
`

const TitleWrapper = styled.div`
    align-self: stretch;
    display: block;
    position: relative;

    a {
        position: absolute;
        top: 4rem;
        right: 2rem;
    }
`


export default function Section(props) {


    // We get from the api a camelcased string as the shelf's name
    // so we have to convert it back to normal sentence
    const indexOfUpperCase = (str) => {
        let index = -1;
        for(let i = 0; i < str.length; i++) {
            if ((str[i] === str[i].toUpperCase()) && ( i !== 0 && str[i] !== " ")) {
                index = i;
                break
            }
        }
        return index
    }

    const camelToNormal = (str) => {
        const index = indexOfUpperCase(str)
        if (index === -1) {
            return str
        } else {
            const letter = str[index]
            const newStr = str.replace(letter, (" " + letter.toLowerCase()))
            return camelToNormal(newStr);
        }
    }


    const { category, books } = props;

    return (

        <Bookshelf>
            <TitleWrapper>
                <Title>
                    {camelToNormal(category)}
                </Title> 
                {props.addIcon && ( 
                    <Link to='./search'>
                        <Icon border padding="20px" iconName="plus" />
                    </Link> )}
            </TitleWrapper>
            <Books handleShelfChange={props.handleShelfChange} books={books} />
        </Bookshelf>
    )
}

