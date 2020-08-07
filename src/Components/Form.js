import React from 'react'
import styled from 'styled-components'

const Input = styled.input`
    font-size: 1.4rem;
    font-family: var(--font-header)
`

const Label = styled.label`
    font-size: 1.4rem;
    font-family: var(--font-header)
`

const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
`

function Form (props) {
    return(
        <Form>
            <Label for=search>Search: </Label>
            <Input type="text" value=''
        </Form>
    )
}