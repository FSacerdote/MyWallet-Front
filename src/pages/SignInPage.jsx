import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { Context } from "../context/Context"

export default function SignInPage() {

  const {setToken, token} = useContext(Context)

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(()=>{
    if (token) {
      navigate("/home")
    }
  })

  function signin(event){
    event.preventDefault()
    axios.post(`${import.meta.env.VITE_API_URL}/sign-in`, {email, password})
      .then((resposta)=> {
        setToken(resposta.data)
        localStorage.setItem("token", resposta.data)
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
        <input data-test="email" placeholder="E-mail" type="email" value={email} onChange={(event)=> setEmail(event.target.value)} onInvalid={()=>alert("Email inválido, por favor tente novamente")}required/>
        <input data-test="password" placeholder="Senha" type="password" autoComplete ="new-password" value={password} onChange={(event)=> setPassword(event.target.value)} required/>
        <button data-test="sign-in-submit" type="submit">Entrar</button>
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
