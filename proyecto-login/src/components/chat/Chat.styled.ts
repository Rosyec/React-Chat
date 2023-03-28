import styled from 'styled-components';

export const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin: 2em;
`
export const MessagessContainer = styled.div`
width: 400px;
height: 600px;
display: flex;
padding: 1em;
border: 1px solid black;
border-radius: 5px;
flex-direction: column;
overflow-y: auto;
right: 0;
`

export const Footer = styled.div`
width: 100%;
display: flex;
margin-top: 1em;
flex-direction: row;
gap: 5px;
`

export const InputMessage = styled.input`
font-family: RobotoMedium;
flex-grow: 1;
padding: 1em;
border: 1px solid black;
font-size: medium;
border-radius: 999px 999px 999px 999px;
`

export const ButtonSend = styled.button`
background-color: black;
height: 4em;
width: 4em;
border-radius: 999px 999px 999px 999px;
color: white;
`