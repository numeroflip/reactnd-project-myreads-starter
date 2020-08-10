import styled from 'styled-components'

const Title = styled.h2`
    font-size: 2rem;
    display: inline-block;
    background: black;
    padding: .5rem 2rem .5rem 6rem;
    text-transform: capitalize;
    border-bottom: 4px solid black;
    font-weight: 700;
    color: white;
    border-radius: 80px;
    margin-left: -4rem;
    margin-top: 4rem;
    margin-bottom: 4rem;
    position: relative;
    box-shadow: var(--box-shadow);

    :before {
        content: "";
        height: calc(100% + 4px);
        width: 3.5rem;
        border-radius: 6px;
        background: var(--gradient-main);
        border: 4px solid black;
        position: absolute;
        top: 0;
        left: 0;
    }

`

export default Title