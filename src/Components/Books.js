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



export default function Books({ books, handleShelfChange }) {

    return(
        <Grid>
            {Array.isArray(books) && (books.map((book, index) => (
                <Book 
                    data={book}
                    handleShelfChange={handleShelfChange}
                    key={index}
                    />
                    ))
                )}
                    
        </Grid>
    )
}