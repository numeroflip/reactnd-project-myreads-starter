import React from 'react'
import Icon from './Icon'
import styled from 'styled-components'
import * as BookAPI from '../BooksAPI'


    const Changer = styled.div`
        position: absolute;
        right: -10px;
        bottom: -10px;   
        min-height: 45px;     
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


export default function BookShelfChanger({ data, handleShelfChange, setInProp }) {

    const handleChange = async (e, book) => {

        setInProp(false)
        const shelf = e.target.value;
        handleShelfChange(book, shelf)

        const bookObj = await BookAPI.get(book.id)
        BookAPI.update(bookObj, shelf)
        
    }

    const value = data.shelf || 'none'
    
    return(
        <Changer>
            <Icon 
                iconName="circle-down"
                padding='0'
                size='40px'
            />
            <Select value={value} onChange={(e) => handleChange(e, data)}>
                <option  value="move" disabled>Move to...</option>
                <option  value="currentlyReading">Currently Reading</option>
                <option  value="wantToRead">Want to Read</option>
                <option  value="read">Read</option>
                <option  value="none">None</option>
            </Select>
        </Changer>
    )
    
}