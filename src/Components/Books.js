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
    const { books, handleShelfChange } = props
    return(
        <div className="bookshelf-books">
            <Grid>
                {Array.isArray(books) && (books.map((book) =>{
                    return  (
                        <Book 
                            data={book}
                            key={book.id} 
                            handleShelfChange={handleShelfChange}
                         />)}
                    ))}
            </Grid>
        </div>
    )
}