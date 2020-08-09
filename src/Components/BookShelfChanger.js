import React from 'react'
import Icon from './Icon'
import styled from 'styled-components'
import * as BookAPI from '../BooksAPI'


    const Changer = styled.div`
        position: absolute;
        right: -10px;
        bottom: -10px;
        width: 40px;
        height: 40px;
        
        `
    const Select = styled.select`
        position: absolute;
        top: 0;
        left: 5px;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
    `


export default function BookShelfChanger(props) {

    const handleChange = async (e, book) => {
        const shelf = e.target.value;
        props.handleShelfChange(book, shelf)

        const bookObj = await BookAPI.get(book.id)
        BookAPI.update(bookObj, shelf)
        
    }

    return(
        <Changer>
            <Icon 
                iconName="circle-down"
                padding='0'
                size='2.4rem'
            />
            <Select value={props.data.shelf} onChange={(e) => handleChange(e, props.data)}>
                <option  value="move" disabled>Move to...</option>
                <option  value="currentlyReading">Currently Reading</option>
                <option  value="wantToRead">Want to Read</option>
                <option  value="read">Read</option>
                <option  value="none">None</option>
            </Select>
        </Changer>
    )
    
}