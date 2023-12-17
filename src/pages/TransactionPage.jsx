import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import { Context } from "../context/Context"
import axios from "axios"
import Swal from "sweetalert2"
import { ThreeDots } from 'react-loader-spinner'

export default function TransactionsPage() {

  const navigate = useNavigate()

  const {type} = useParams()
  const [value, setValue] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)

  const {token} = useContext(Context)
  const config = {
    headers:{
      Authorization: `Bearer ${token}`
    }
  }

  function send(event){
    event.preventDefault()
    setLoading(true)
    axios.post(`${import.meta.env.VITE_API_URL}/transactions`, {value: Number(value).toFixed(2), description, type}, config)
      .then(()=>{
        setLoading(false)
        navigate("/home")
      })
      .catch((error)=>{
        setLoading(false)
        if (error.response.status === 422) return fireSweetAlertError("Os dados fornecidos estão em um formato inválido")
        if (error.response.status === 401) return fireSweetAlertError("Erro de autorização, tente logar novamente")
        fireSweetAlertError("Erro ao computar a transação")
      })
  }

  function fireSweetAlertError(text){
    return Swal.fire({
      title: 'Error!',
      text,
      icon: 'error'
    })
  }

  function handleInvalidForm(event){
    event.preventDefault()
    fireSweetAlertError("Preencha todos os campos por favor")
  }

  return (
    <TransactionsContainer>
      <h1>Nova {type}</h1>
      <form onSubmit={send} onInvalid={handleInvalidForm}>
        <input disabled={loading} data-test="registry-amount-input" placeholder="Valor" type="text" value={value} onChange={(event)=>setValue(event.target.value)} required/>
        <input disabled={loading} data-test="registry-name-input" placeholder="Descrição" type="text" value={description} onChange={(event)=>setDescription(event.target.value)} required/>
        <button disabled={loading} data-test="registry-save" type="submit">
          {
            loading?
            <ThreeDots
            height="auto"
            width="50"
            radius="9"
            color="white"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
            />
            :
            <>Salvar {type}</>
          }
        </button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 90%;
  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
  button{
    height: 46px;
    display: flex;
    justify-content: center;
  }
`
