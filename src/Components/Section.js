import React from 'react'
import Title from './Title'
import Books from './Books'
import styled from 'styled-components'

const Bookshelf = styled.div`
padding: 0 10px 20px;

@media (min-width: 600px) {
    padding: 0 20px 40px;
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
            <Title>{camelToNormal(category)}</Title>
            <Books handleShelfChange={props.handleShelfChange} books={books} />
        </Bookshelf>
    )
}

