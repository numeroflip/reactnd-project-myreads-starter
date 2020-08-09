import styled from 'styled-components'

export default styled.input`
    width: 100%;
    height: 68px; /* back arrow icon's size */
    display: flex;
    justify-content: center;
    background-color: #fff;
    padding: .5rem 1rem;
    padding-left: 1.5rem;
    box-shadow: 0px 2px 15px -5px black;
    border: 4px solid black;
    border-radius: 50%;
    font-size: inherit;
    font-family: var(--font-header);
    border-radius: 50px;

    &:focus {
        outline: none;
        background-color: rgba(19,208,117,0.07);
    }

`