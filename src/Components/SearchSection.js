import React, { useState, useEffect } from 'react'
import FormInput from './FormInput'
import Section from './Section'
import styled from 'styled-components'
import { search } from '../BooksAPI'
import { Link } from 'react-router-dom'
import Icon from './Icon'

const Form = styled.form`
font-size: 2rem;
width: 100%;
margin: 0 auto;
display: flex;
align-items: center;
justify-content: center;
position: relative;
max-width: 600px;

> a {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
}

@media(max-width: 600px) {
    font-size: 1.7rem;
}

`

export default function SearchSection(props) {

    // ================ STATE =====================
    const [query, setQuery] = useState('')
    const [loadedBooks, setLoadedBooks] = useState([])

    // =============================================
    // When query changes, fetch and render books
    useEffect( () => {
        (async function () {
            const booksArr = await search(query)
            const formattedBooks = formatBooks(booksArr)
            const booksWithShelf = formattedBooks.map(book => {
                book.shelf = props.bookOnWhichShelf(book.id)
                return book
            })
            setLoadedBooks(booksWithShelf)
        })()
    },[query])

    const formatBooks = (books) => {
        return  Array.isArray(books) 
            ?   books.map(book => props.getDataFromObj(book))
            :   []
    } 

    return (
        <div>
            <Form>
                <Link to='/'>
                    <Icon border size='30px' padding='15px' iconName='arrow-left2'></Icon>
                </Link>
                <FormInput 
                    name="search"
                    type="text" 
                    value={query}
                    placeholder="Search"
                    onChange={(e) => setQuery(e.target.value)}
                />
            </Form>
                <Section 
                    handleShelfChange={props.handleShelfChange}
                    getDataFromObj={props.getDataFromObj} 
                    category="Results" 
                    books={loadedBooks}
                />
        </div>
    )
}