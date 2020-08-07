import React, { Component } from 'react'
import FormInput from './FormInput'
import Section from './Section'
import Label from './Label'
import { search } from '../BooksAPI'
import { Link } from 'react-router-dom'
import Icon from './Icon'


export default class SearchSection extends Component {

    state = {
        query: '',
        books: []
    }

    syncStateAndInput = async (e) => {
        this.setState({query: e.target.value})
        return true;
    }

    handleChange = async (e) => {
        await this.syncStateAndInput(e)
        const query = await search(this.state.query)
        console.log(query);
        this.setState({books: query});
    }

    formattedBooks = (books) => {
        return  Array.isArray(books) 
            ?   books.map(book => this.getDataFromObj(book))
            :   []
        
    } 

    getDataFromObj = this.props.getDataFromObj


    

    render() {
        return (
            <div>
                <form className="search-books" style={{
                display: 'flex',
                alignItems: 'center',
            }} >
                    <Link to='/'>
                        <Icon border padding='15px' iconName='arrow-left2'></Icon>
                    </Link>
                    <Label htmlFor='search'>
                    Search:
                    </Label>
                    <FormInput 
                        name="search"
                        type="text" 
                        value={this.state.query}
                        onChange={(e) => this.handleChange(e)}
                    />
            </form>
                <Section 
                    getDataFromObj={this.getDataFromObj} 
                    category="" 
                    books={(this.formattedBooks(this.state.books))}
                />
        </div>
        )
    }
}