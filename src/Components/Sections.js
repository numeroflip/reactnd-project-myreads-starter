import React from 'react'
import Section from './Section'
import styled from 'styled-components'

const SectionsWrapper = styled.article`

    position: relative;

    & > a {
        position: absolute;
        top: 4rem;
        right: 3rem;
    }
`

export default function Sections(props) {
    const { books } = props;
    let shelves, booksOnShelves
    if (Array.isArray(books)) {
        shelves = Array.from(new Set(books.map(book => book.shelf)))
        booksOnShelves = shelves.map(shelf => books.filter(book => book.shelf === shelf))
    }
    
    return(

        <SectionsWrapper>
            {props.children}
            {shelves[0] && shelves.map((shelf, i) => (
                <Section addIcon={props.addIcon} handleShelfChange={props.handleShelfChange} category={shelf} books={booksOnShelves[i]} key={9999-i} />
            ))}
        </SectionsWrapper>

    )
}