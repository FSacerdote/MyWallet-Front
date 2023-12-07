import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
    }
    button {
        outline: none;
        border: none;
        border-radius: 5px;
        background-color: #a328d6;
        font-size: 20px;
        font-weight: 600;
        color: #fff;
        cursor: pointer;
        width: 100%;
        padding: 12px;
        &:hover{
            cursor: pointer;
            filter: brightness(0.95);
        }
        &:disabled{
            filter: brightness(0.8);
            cursor: auto;
        }
    }
    h1 {
        font-weight: 700;
        font-size: 26px;
        color: white;
    }
    input {
        font-size: 20px;
        width: calc(100% - 30px);
        border-radius: 5px;
        outline: none;
        border: 1px solid #ccc;
        padding: 15px;
        margin: 1px;
        &:focus {
            border: 2px solid #ffb6b6;
            margin: 0px;
        }
        &:disabled{
            background-color: white;
            filter: brightness(0.8);
        }
    }
    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 15px;
        width: 100%;
        border-radius: 5px;
    }
    a {
        font-weight: 700;
        font-size: 15px;
        line-height: 18px;
        color: white;
        text-decoration: none;
        padding-top: 30px;
    }
    .swal2-icon{
        margin-top: 20px;
        justify-self: center;
        border: 0.25em solid rgba(0,0,0,0);
    }
    .swal2-container{
        padding-left: 20px;
        padding-right: 20px;
    }
`

export default GlobalStyle