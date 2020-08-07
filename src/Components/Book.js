import React from 'react'
import BookImg from './BookImg'
import BookAuthor from './BookAuthor'
import BookTitle from './BookTitle'
import BookShelfChanger from './BookShelfChanger'
export default function Book(props) {
    const { title , imgURL, author, id, syncData } = props
    return(             
            <li>
                <div className="book">
                    <div className="book-top">
                        <BookImg imgURL={imgURL} />                        
                        <BookShelfChanger syncData={syncData} id={id} />
                    </div>
                    <BookTitle>{title}</BookTitle>
                    <BookAuthor author={author}/>
                </div>
            </li>
    )
}