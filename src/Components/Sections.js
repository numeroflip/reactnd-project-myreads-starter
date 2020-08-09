import React from 'react'
import Section from './Section'

export default function Sections(props) {
    const { shelves } = props.data;

    return(

        <div className={props.clName && props.clName} >

            {shelves.map((shelf, i) => (
                <Section handleShelfChange={props.handleShelfChange} category={shelf.name} books={shelf.books} key={9999-i} />
            ))}
            
        </div>

    )
}