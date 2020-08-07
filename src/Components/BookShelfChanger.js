import React from 'react'
import Icon from './Icon'
import { get, update } from '../BooksAPI'
export default function BookShelfChanger(props) {
    const {id, syncData} = props;

    const selectStyle = {
        position: 'absolute',
        top: '0',
        left: '-5px',
        width: "100%",
        height: "100%",
        opacity: "0",
        cursor: "pointer",
    }

    const changerStyle = {
        position: 'absolute',
        right: '0',
        bottom: '-10px',
        width: '40px',
        height: '40px'
    }
    
    const moveBookTo = async (id, shelf) => {
        console.log(id)
        const book = await get(id)
        console.log(book)
        await update(book, shelf)
        if (document.location.href !== "http://localhost:3000/search") {syncData()}
        else {document.location.href='/'}
    }
    

    return(
        <div className="book-shelf-changer" style={changerStyle}>
            <Icon 
                iconName="circle-down"
                padding='0'
                size='2.4rem'
            />
            <select style={selectStyle}>
                <option value="move" disabled>Move to...</option>
                <option onClick={() => moveBookTo(id, "currentlyReading")} value="currentlyReading">Currently Reading</option>
                <option onClick={() => moveBookTo(id, "wantToRead")} value="wantToRead">Want to Read</option>
                <option onClick={() => moveBookTo(id, "read")} value="read">Read</option>
                <option onClick={() => moveBookTo(id, "none")} value="none">None</option>
            </select>
        </div>
    )
}