import React from 'react'
import SectionTitle from './SectionTitle'
import Books from './Books'
export default function Section(props) {


    // We get from the api a camelcased string as the shelf's name
    // so we have to convert it back to normal sentence
    const indexOfUpperCase = (str) => {
        let index = -1;
        for(let i = 0; i < str.length; i++) {
            if ((str[i] === str[i].toUpperCase()) && ( i !== 0 && str[i] !== " ")) {
                index = i;
                break
            }
        }
        return index
    }

    const camelToNormal = (str) => {
        const index = indexOfUpperCase(str)
        if (index === -1) {
            return str
        } else {
            const letter = str[index]
            const newStr = str.replace(letter, (" " + letter.toLowerCase()))
            return camelToNormal(newStr);
        }
    }

    const { category, books } = props;
    return (

        <div className="bookshelf">
            <SectionTitle title={ camelToNormal(category) } style={{marginBottom: '10rem'}}/>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    <Books syncData={props.syncData} books={books} />
                </ol>
            </div>
        </div>
    )
}

