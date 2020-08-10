import React from 'react'
import Section from './Section'

export default function Sections(props) {
    const { books } = props;
    console.log('Section books: ', books)
    let shelves, booksOnShelves
    if (Array.isArray(books)) {
        shelves = Array.from(new Set(books.map(book => book.shelf)))
        booksOnShelves = shelves.map(shelf => books.filter(book => book.shelf === shelf))
    }


    
    return(

        <div>

            {shelves[0] && shelves.map((shelf, i) => (
                <Section handleShelfChange={props.handleShelfChange} category={shelf} books={booksOnShelves[i]} key={9999-i} />
            ))}
            
        </div>

    )
}