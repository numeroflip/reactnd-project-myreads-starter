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
    const { data } = props
    return(             
            <BookItem>
                <BookTop>
                    <BookImg imgURL={data.imgURL}/>                        
                    <BookShelfChanger handleShelfChange={props.handleShelfChange} data={data} />
                </BookTop>
                <BookTitle>{data.title}</BookTitle>
                {data.author.map((author, i) => (<BookAuthor key={i}>{author}</BookAuthor>))}
            </BookItem>
    )
}