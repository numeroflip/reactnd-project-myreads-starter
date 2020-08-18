import React, { useState } from 'react'
import BookImg from './BookImg'
import BookAuthor from './BookAuthor'
import BookTitle from './BookTitle'
import BookShelfChanger from './BookShelfChanger'
import styled from 'styled-components'
import { Transition } from 'react-transition-group'



const BookTop = styled.div`
    position: relative;
    height: 200px;
    display: flex;
    align-items: flex-end;
`

const BookItem = styled.li`
    padding: 10px 15px;
    text-align: left;
    width: 160px;
    transition: 0.1s;
    opacity: ${({ state }) => isTransitioning(state) ? 0 : 1};
`

function isTransitioning(state) {
    if (state === 'entering' || state === 'exiting') { return true}
    return false
}

export default function Book({ data, handleShelfChange }) {

    const { imgURL, id, title, author} = data

    const [inProp, setInProp] = useState(true)
    

    return( 
        <Transition key={id} in={inProp} timeout={100} appear={true}>
            {state => {
                console.log(state)
                return(
                    <BookItem state={state}>
                        <BookTop>
                            <BookImg imgURL={imgURL}/>                        
                            <BookShelfChanger handleShelfChange={handleShelfChange} setInProp={setInProp} data={data} />
                        </BookTop>
                        <BookTitle>{title}</BookTitle>
                        {author.map((author, i) => (<BookAuthor key={i}>{author}</BookAuthor>))}
                    </BookItem>
                )
            }}
        </Transition> 
    )
}