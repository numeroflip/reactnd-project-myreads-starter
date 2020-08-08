import React from 'react'
import Icon from './Icon'
import styled from 'styled-components'
import { get, update } from '../BooksAPI'
export default function BookShelfChanger(props) {
    const {id, syncData} = props;


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
    
    
    const moveBookTo = async (id, shelf) => {
        console.log(id)
        const book = await get(id)
        console.log(book)
        await update(book, shelf)
        if (document.location.href !== "http://localhost:3000/search") {syncData()}
        else {document.location.href='/'}
    }
    

    return(
        <Changer>
            <Icon 
                iconName="circle-down"
                padding='0'
                size='2.4rem'
            />
            <Select>
                <option value="move" disabled>Move to...</option>
                <option onClick={() => moveBookTo(id, "currentlyReading")} value="currentlyReading">Currently Reading</option>
                <option onClick={() => moveBookTo(id, "wantToRead")} value="wantToRead">Want to Read</option>
                <option onClick={() => moveBookTo(id, "read")} value="read">Read</option>
                <option onClick={() => moveBookTo(id, "none")} value="none">None</option>
            </Select>
        </Changer>
    )
}