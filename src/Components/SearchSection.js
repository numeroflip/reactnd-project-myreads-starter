import React, { Component } from 'react'
import FormInput from './FormInput'
import Section from './Section'
import Label from './Label'
import styled from 'styled-components'
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


    Form = styled.form`
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



            /* > a {
                margin: 0;
                margin-top: 2rem;
                position: relative;
                display: block;
            } */

    `

    render() {
        const Form = this.Form;
        return (
            <div>
                <Form>
                    <Link to='/'>
                        <Icon border size='30px' padding='15px' iconName='arrow-left2'></Icon>
                    </Link>
                    <FormInput 
                        name="search"
                        type="text" 
                        value={this.state.query}
                        placeholder="Search"
                        onChange={(e) => this.handleChange(e)}
                    />
                </Form>
                    <Section 
                        getDataFromObj={this.getDataFromObj} 
                        category="Results" 
                        books={(this.formattedBooks(this.state.books))}
                    />
            </div>
        )
    }
}