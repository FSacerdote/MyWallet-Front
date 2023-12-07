import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { Context } from "../context/Context"
import Swal from 'sweetalert2'

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

  function fireSweetAlertError(text){
    return Swal.fire({
      title: 'Error!',
      text,
      icon: 'error'
    })
  }

  function signin(event){
    event.preventDefault()
    axios.post(`${import.meta.env.VITE_API_URL}/sign-in`, {email, password})
      .then((resposta)=> {
        setToken(resposta.data)
        localStorage.setItem("token", resposta.data)
        navigate('/home')
      })
      .catch((error)=>{
        if(error.response.status === 422) return fireSweetAlertError("Formato inválido dos dados, tente novamente")
        if(error.response.status === 404) return fireSweetAlertError("Não foi possível encontrar nenhuma conta com o email fornecido")
        if(error.response.status === 401) return fireSweetAlertError("Senha incorreta, por favor tente novamente")
        fireSweetAlertError("Erro ao realizar a requisição, tente novamente mais tarde")
      })
  }

  function handleInvalidForm(event){
    event.preventDefault()
    return fireSweetAlertError("Por favor preencha todos os campos corretamente!")
  }

  return (
    <SingInContainer>
      <form onSubmit={signin} onInvalid={handleInvalidForm}>
        <MyWalletLogo />
        <input data-test="email" placeholder="E-mail" type="email" value={email} onChange={(event)=> setEmail(event.target.value)} required/>
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
