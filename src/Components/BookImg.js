import styled from 'styled-components'

const BookImg = styled.div`
    background: #eee;
    border-radius: 6px;
    border: 4px solid black;
    width: 128px;
    height: 193px;
    background-image: url(${props => props.imgURL});
    background-size: cover;
    background-position: center;

`
export default BookImg
