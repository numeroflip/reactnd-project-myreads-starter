import React from 'react'
import BookImg from './BookImg'
import BookAuthor from './BookAuthor'
import BookTitle from './BookTitle'
import BookShelfChanger from './BookShelfChanger'
import styled from 'styled-components'

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
`

export default function Book(props) {
    const { title , imgURL, author, id, syncData } = props
    return(             
            <BookItem>
                <BookTop>
                    <BookImg imgURL={imgURL}/>                        
                    <BookShelfChanger syncData={syncData} id={id} />
                </BookTop>
                <BookTitle>{title}</BookTitle>
                <BookAuthor>- {author}</BookAuthor>
            </BookItem>
    )
}