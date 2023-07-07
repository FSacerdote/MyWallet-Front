import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"

export default function SignInPage() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function signin(){

  }

  return (
    <SingInContainer>
      <form onSubmit={signin}>
        <MyWalletLogo />
        <input placeholder="E-mail" type="email" value={email} onChange={(event)=> setEmail(event.target.value)} required/>
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
