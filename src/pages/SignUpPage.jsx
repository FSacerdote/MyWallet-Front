import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import axios from "axios"

export default function SignUpPage() {

  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setConfirmation] = useState("")


  function signup(event){
    event.preventDefault()
    if(password.length < 3 ){
      return alert("A senha deve ter no minimo 3 caracteres")
    } else if(password !== passwordConfirmation){
      return alert("A senha deve ser igual a confirmação de senha")
    } else{
      axios.post(`${import.meta.env.VITE_API_URL}/sign-up`, {name, email, password})
        .then(()=> navigate("/"))
        .catch((error)=>{
            if(error.response.status === 409){
              alert("Este email já é cadastrado")
            }else if(error.response.status === 422){
              alert("Dados inválidos, por favor tente novamente")
            }else{
              alert("Erro ao realizar o cadastro")
            }
        })
    }
  }

  return (
    <SingUpContainer>
      <form onSubmit={signup}>
        <MyWalletLogo />
        <input placeholder="Nome" type="text" value={name} onChange={(event)=> setName(event.target.value)} required/>
        <input placeholder="E-mail" type="email" value={email} onChange={(event)=> setEmail(event.target.value)} onInvalid={()=> alert("Email inválido, tente novamente")}required/>
        <input placeholder="Senha" type="password" autocomplete="new-password" value={password} onChange={(event)=> setPassword(event.target.value)} required/>
        <input placeholder="Confirme a senha" type="password" autocomplete="new-password" value={passwordConfirmation} onChange={(event)=> setConfirmation(event.target.value)} required/>
        <button type="submit">Cadastrar</button>
      </form>

      <Link to={"/"}>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
