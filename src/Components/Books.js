import React from 'react'
import Book from './Book'
export default function Books(props) {
    const { books, syncData } = props
    return(
        <div className="bookshelf-books">
            <ol className="books-grid">
                {Array.isArray(books) === true && (books.map((book, i) =>{
                    const { author, title, imgURL, id } = book ;
                    return  (
                        <Book 
                            title={title} 
                            key={i} 
                            id={id}
                            author={author} 
                            imgURL={imgURL} 
                            syncData={syncData}
                         />)}
                    ))}

            </ol>
        </div>
    )
}