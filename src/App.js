import React from 'react'
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
class BooksApp extends React.Component {

  state = {shelves: []}

  containsKeyValue = (array, key, value) => {
    let ans = false;
    array.forEach(obj => {
      if(obj[key] === value) {ans = true}
    })
    return ans;
  }

/**
 *    Filters the used data from API response.
 *    Handle cases when no image or author is provided. 
 *    @param {Object} bookObj - a book object coming from the API descibing a single book
 */ 
  getDatafromObj = (bookObj) => {
    return {
      title: bookObj.title,
      author: bookObj.authors ? bookObj.authors[0] : 'Unknown',
      id: bookObj.id,
      shelf: bookObj.shelf || 'none',
      imgURL: bookObj.imageLinks 
              ? bookObj.imageLinks.thumbnail
              : 'https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg' 
    }
  }

  
  // ================HELPER FUNCTIONS=================
  bookOnWhichShelf = (id) => {
    const shelves = this.state.shelves;
    let shelf = shelves.filter(shelf => 
      Boolean(
        shelf.books
        .filter(book => book.id === id)[0])
        )[0]
    shelf && (shelf = shelf.name)
    console.log(shelf)
    return shelf 
          ? shelf
          : 'none'
  }
  
  
  moveInUI = (book, shelf) => {
    shelf === 'none' && (shelf = null)
    const currentShelf = this.findCurrentShelf(book)  //the self in the state
    currentShelf
      ? this.moveBookTo(book, shelf, currentShelf)
      : this.addBookToShelf(book, shelf)

  }

  findCurrentShelf = (book) => {
    const state = this.state
    const currentShelf = state.shelves.filter(shelf => shelf.books.includes(book))[0]
    return currentShelf 
            ? currentShelf.name
            : null
  }

  moveBookTo = (book, shelf, currentShelf) => {
      this.removeBookFromShelf(book, currentShelf)
      shelf !== null && this.addBookToShelf(book, shelf)
  }

  removeBookFromShelf = (book, shelf) => {
    let state = this.state
    const shelfIndex = this.indexOfShelf(shelf)
    const books = state.shelves[shelfIndex].books
    const bookIndex = books.indexOf(book)
    let newBooks = books
    books.splice(bookIndex, 1)
    state.shelves[shelfIndex].books = newBooks;
    this.setState({state})
  }

  
  addBookToShelf = (book, shelf) => {
    
    let state = this.state;
    book.shelf = shelf;
    const index = this.indexOfShelf(shelf)
    state.shelves[index].books.push(book)
    this.setState({state});
  }

  indexOfShelf = (shelf) => {
    const shelves = this.state.shelves;
    const thisSelf = shelves.filter(currShelf => currShelf.name === shelf)[0];
    const index = shelves.indexOf(thisSelf)
    return index
  }


// ==========MAIN FUNCTIONS=====================================

  handleShelfChange = async (book, shelf) => {
    if (shelf === 'none') {

    }
    this.moveInUI(book, shelf)

  }
  


   //get shelves data from API at start
  syncData = async () => {
    let shelves = []

    const allData = await BooksAPI.getAll()

    allData.forEach(data => {

        const filteredData = this.getDatafromObj(data)
        const shelf = data.shelf
        const isNewShelf = !this.containsKeyValue(shelves, 'name', shelf)

        let index;
        if( isNewShelf) { index = shelves.length}
        else {shelves.forEach((currShelf, i) => {
          if(currShelf.name === shelf) {index = i}
        })} 
        if (isNewShelf) {
          shelves[index] = {
            name: shelf,
            books: [filteredData]
          }
        } else {
          shelves[index].books.push(filteredData)
        }
    })
    this.setState({shelves: shelves})
  }
  
  
  componentDidMount() {
    this.syncData()    
   } 


  render() {
    return (
      <App>
        <Header>MyReads</Header>
          <Route exact path='/' render={() => (
            <div>
              <Sections 
                handleShelfChange={this.handleShelfChange}
                clName="list-books" 
                data={this.state}
                getData={this.getDatafromObj}  
              />
                <Link to='./search'>
                  <Icon style={{marginBottom: '6rem'}} border padding="20px" iconName="plus" />
                </Link> 
            </div>
          )} 
          />
          <Route exact path='/search' render={() => (
            <SearchSection bookOnWhichShelf={this.bookOnWhichShelf} style={{justifySelf: 'center'}} handleShelfChange={this.handleShelfChange} getDataFromObj={this.getDatafromObj} />
          )} 
          />
        <Footer>
          <p>Site made by Aron Berenyi</p>
        </Footer>
      </App>    


    )
  }
}

export default BooksApp
