import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useContext, useState } from "react"
import axios from "axios"
import { Context } from "../components/Context"

export default function SignInPage() {

  const {setUser} = useContext(Context)

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function signin(event){
    event.preventDefault()
    axios.post(`${import.meta.env.VITE_API_URL}/sign-in`, {email, password})
      .then((resposta)=> {
        setUser(resposta.data)
        navigate('/home')
      })
      .catch((error)=>{
        if(error.response.status === 422) return alert("Formato inválido dos dados, tente novamente")
        if(error.response.status === 404) return alert("Não foi possível encontrar nenhuma conta com o email fornecido")
        if(error.response.status === 401) return alert("Senha incorreta, por favor tente novamente")
        alert("Erro ao realizar novamete, tente novamente mais tarde")
      })
  }

  return (
    <SingInContainer>
      <form onSubmit={signin}>
        <MyWalletLogo />
        <input placeholder="E-mail" type="email" value={email} onChange={(event)=> setEmail(event.target.value)} onInvalid={()=>alert("Email inválido, por favor tente novamente")}required/>
        <input placeholder="Senha" type="password" autocomplete="new-password" value={password} onChange={(event)=> setPassword(event.target.value)} required/>
        <button type="submit">Entrar</button>
      </form>

      <Link to={'/cadastro'}>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
