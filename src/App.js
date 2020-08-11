import React, { useState, useEffect} from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import styled from 'styled-components'
import bgImg from './img/blizzard.png'

// ============ Components ==================
import Header from './Components/Header'
import Sections from './Components/Sections'
import Footer from './Components/Footer'
import SearchSection from './Components/SearchSection'


// =========== CSS STYLES ================
const App = styled.div`
  background-image: url(${bgImg}); 
  margin: 4rem auto;
  max-width: 1200px;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 2px 2px 10px 2px rgba(56, 56, 56, 0.342);
  font-family: var(--font-text), sans-serif;
  border: 4px solid black;
  min-height: 100vh;
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr auto;
  justify-items: stretch;

  > * {
    padding: 0 2rem;
  }


  @media(max-width: 1200px) {
    width: 100%;
    margin: 0;
    border: 0;
    border-radius: 0;
  }
`


/*  The whole app */
function BooksApp()  {

  const [books, setBooks] = useState([])

  useEffect(() => {
    (async function() {
      const data = await getPageDataFromServer()
      setBooks(data);
    })()
  }, [])


  
  // ================HELPER FUNCTIONS=================

  const findBookByID= (id, booksArr = books) => {
    const book = booksArr.filter( book => book.id === id)[0]
    return book
      ? book
      : null

  }


  const getShelfOfBook = id => {
    const book = findBookByID(id, books)
    return book
            ? book.shelf
            : null
  }
  // Filters data provided from API request, and formats it
  const getDatafromObj = bookObj => {

    let ansObj = {
      title: bookObj.title,
      author: bookObj.authors ? bookObj.authors : ['Unknown'],
      id: bookObj.id,
      shelf: bookObj.shelf || getShelfOfBook(bookObj.id),
      imgURL: bookObj.imageLinks 
              ? bookObj.imageLinks.thumbnail
              : 'https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg' 
    }
    return ansObj
  }

  const removeBook = id => {
    const updatedBooks = books.filter(book => book.id !== id)
    setBooks(updatedBooks)
  }

  const addBook = (providedBook) => {
    const id = providedBook.id
    const isOnShelf = Boolean(findBookByID(providedBook.id));
    if (isOnShelf) {
      const newBooks = books.map(book => book.id === id ? Object.assign(providedBook) : book)
      setBooks(newBooks)
    } else {
      setBooks([...books, providedBook])
    }
  }
  
  const moveBookTo = (book, shelf) => {
    book.shelf = shelf
    shelf !== null && addBook(book, shelf)
  }
  
  const moveInUI = (book, shelf) => {
    !shelf && removeBook(book.id)
    moveBookTo(book, shelf)
  }

  // ==========MAIN FUNCTIONS=====================================

  const handleShelfChange = async (book, shelf) => {
    if (shelf === 'none') {shelf = null}
    moveInUI(book, shelf)

  }

   //get shelves data from API at start
  const getPageDataFromServer = async () => {
    

    const allData = await BooksAPI.getAll()
    const filteredData = allData.map(bookObj => getDatafromObj(bookObj))
    return filteredData
  }
  

  return (
    <App>
      <Header>MyReads</Header>
        <Route exact path='/' render={() => (
          <div>
            <Sections 
              addIcon
              handleShelfChange={handleShelfChange}
              books={books}
              getData={getDatafromObj}  
            >
            </Sections>

          </div>
        )} 
        />
        <Route exact path='/search' render={() => (
          <SearchSection bookOnWhichShelf={getShelfOfBook} style={{justifySelf: 'center'}} handleShelfChange={handleShelfChange} getDataFromObj={getDatafromObj} />
        )} 
        />
      <Footer>
        <p>Site made by Aron Berenyi</p>
      </Footer>
    </App>    

  )
}

export default BooksApp
