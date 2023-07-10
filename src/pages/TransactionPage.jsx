import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import { Context } from "../components/Context"
import axios from "axios"

export default function TransactionsPage() {

  const navigate = useNavigate()

  const {tipo} = useParams()
  const [value, setValue] = useState("")
  const [description, setDescription] = useState("")

  const {token} = useContext(Context)
  const config = {
    headers:{
      Authorization: `Bearer ${token}`
    }
  }

  useEffect(()=>{
    if (!token) {
      navigate("/")
    }
  }, [])

  function send(event){
    event.preventDefault()
    axios.post(`${import.meta.env.VITE_API_URL}/transactions`, {value, description, type: tipo}, config)
      .then(()=>navigate("/home"))
      .catch((error)=>{
        if (error.response.status === 422) return alert("Os dados fornecidos estão em um formato inválido")
        if (error.response.status === 401) return alert("Erro de autorização, tente logar novamente")
        alert("Erro ao computar a transação")
      })
  }
  return (
    <TransactionsContainer>
      <h1>Nova {tipo}</h1>
      <form onSubmit={send}>
        <input data-test="registry-amount-input" placeholder="Valor" type="text" value={value} onChange={(event)=>setValue(event.target.value)} required/>
        <input data-test="registry-name-input" placeholder="Descrição" type="text" value={description} onChange={(event)=>setDescription(event.target.value)} required/>
        <button data-test="registry-save" type="submit">Salvar {tipo}</button>
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

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
