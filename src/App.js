import React from 'react'
import Header from './Components/Header'
import Sections from './Components/Sections'
import Footer from './Components/Footer'
import {Route, Link} from 'react-router-dom'
import SearchSection from './Components/SearchSection'
import Icon from './Components/Icon'
import styled from 'styled-components'
import bgImg from './img/blizzard.png'
import {getAll, update} from './BooksAPI'

import './App.css'


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

  > * {
    padding: 0 2rem;
  }
`



class BooksApp extends React.Component {

  categories = ['Currently Reading', 'Want to Read', 'Read']
  state = {shelves: []}

  containsKeyValue = (array, key, value) => {
    let ans = false;
    array.map(obj => {
      if(obj[key] === value) {ans = true}
    })
    return ans;
  }

  getDatafromObj = (bookObj) => {
    return {
      title: bookObj.title,
      author: bookObj.authors ? bookObj.authors[0] : 'Unknown',
      id: bookObj.id,
      imgURL: bookObj.imageLinks 
              ? bookObj.imageLinks.thumbnail
              : 'https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg' 
    }
  }

  moveBookTo = (bookID, shelf) => {
    update(bookID, shelf)
  }

  syncData = async () => {
    let shelves = []

    const allData = await getAll()

    allData.map(data => {

        const filteredData = this.getDatafromObj(data)
        const shelf = data.shelf
        const isNewShelf = !this.containsKeyValue(shelves, 'name', shelf)
        let index;
        if( isNewShelf) { index = shelves.length}
        else {shelves.map((currShelf, i) => {
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
                syncData={this.syncData}
                clName="list-books" 
                data={this.state}
                getData={this.getDatafromObj}  
              />
                <Link to='./search'>
                  <Icon style={{marginBottom: '6rem'}} border padding="15px" iconName="plus" />
                </Link> 
            </div>
          )} 
          />
          <Route exact path='/search' render={() => (
            <SearchSection getDataFromObj={this.getDatafromObj} />
          )} 
          />
        <Footer>Site made by Aron Berenyi</Footer>
      </App>    


    )
  }
}

export default BooksApp
