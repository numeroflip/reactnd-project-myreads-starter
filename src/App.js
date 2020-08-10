import React, { useState, useEffect} from 'react'
import {Route, Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import styled from 'styled-components'
import bgImg from './img/blizzard.png'

// ============ Components ==================
import Header from './Components/Header'
import Sections from './Components/Sections'
import Footer from './Components/Footer'
import SearchSection from './Components/SearchSection'
import Icon from './Components/Icon'


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
function BooksApp(props)  {

  const [books, setBooks] = useState([])

  useEffect(() => {
    (async function() {
      console.log('useEffect is fired')
      const data = await getPageDataFromServer()
      setBooks(data);
    })()
  }, [])


/**
 *    Filters the used data from API response.
 *    Handle cases when no image or author is provided. 
 *    @param {Object} bookObj - a book object coming from the API descibing a single book
 */ 


  
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

  const getDatafromObj = (bookObj) => {
    const shelf = bookObj.shelf || getShelfOfBook(bookObj.id)
    let ansObj = {
      title: bookObj.title,
      author: bookObj.authors ? bookObj.authors : 'Unknown',
      id: bookObj.id,
      shelf: shelf,
      imgURL: bookObj.imageLinks 
              ? bookObj.imageLinks.thumbnail
              : 'https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg' 
    }
    // TODO: lookup if it is in a shelf already on the main page
    return ansObj
  }

  const removeBook = (id) => {
    console.log('removebook fired')
    console.log('books: ', books)
    const book = findBookByID(id, books) 
    console.log('book: ', book)
    const index = books.indexOf(book)
    console.log('index: ', index)
    const newBooks = [...books]
    newBooks.splice(index, 1)
    console.log('books: ', newBooks)
    setBooks(newBooks)
  }

  const addBook = (book) => {
    const oldBook = findBookByID(book.id);
    if (oldBook) {
      const index = books.indexOf(oldBook);
      const newBooks = [...books]
      newBooks.splice(index, 1 )
      setBooks([...newBooks, book ])
    } else {
      setBooks([...books, book])
    }
  }

  const moveInUI = (book, shelf) => {
    !shelf && removeBook(book.id)
    moveBookTo(book, shelf)
  }


  const moveBookTo = (book, shelf) => {
      book.shelf = shelf
      shelf !== null && addBook(book, shelf)
  }

// ==========MAIN FUNCTIONS=====================================

  const handleShelfChange = async (book, shelf) => {
    if (shelf === 'none') {shelf = null}
    moveInUI(book, shelf)

  }

   //get shelves data from API at start
  const getPageDataFromServer = async () => {
    

    const allData = await BooksAPI.getAll()
    console.log(allData)
    const filteredData = allData.map(bookObj => getDatafromObj(bookObj))
    return filteredData
  }
  

  return (
    <App>
      <Header>MyReads</Header>
        <Route exact path='/' render={() => (
          <div>
            <Sections 
              handleShelfChange={handleShelfChange}
              books={books}
              getData={getDatafromObj}  
            />
              <Link to='./search'>
                <Icon style={{marginBottom: '6rem'}} border padding="20px" iconName="plus" />
              </Link> 
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
