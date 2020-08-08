import React from 'react'
import styled from 'styled-components'
import Book from './Book'

const Grid = styled.ol`
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`

export default function Books(props) {
    const { books, syncData } = props
    return(
        <div className="bookshelf-books">
            <Grid>
                {/* Mapping through books */}
                {Array.isArray(books) === true && (books.map((book, i) =>{
                    const { author, title, imgURL, id } = book ;
                    return  (
                        <Book 
                            title={title} 
                            key={i} 
                            id={id}
                            author={author} 
                            imgURL={imgURL} 
                            syncData={syncData}
                         />)}
                    ))}

            </Grid>
        </div>
    )
}