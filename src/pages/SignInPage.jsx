import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { Context } from "../context/Context"
import Swal from 'sweetalert2'
import { ThreeDots } from 'react-loader-spinner'

export default function SignInPage() {

  const {setToken, token} = useContext(Context)

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

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
    setLoading(true)
    axios.post(`${import.meta.env.VITE_API_URL}/sign-in`, {email, password})
      .then((response)=> {
        setToken(response.data)
        localStorage.setItem("token", response.data)
        setLoading(false)
        navigate('/home')
      })
      .catch((error)=>{
        setLoading(false)
        setEmail("")
        setPassword("")
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
        <input disabled={loading} data-test="email" placeholder="E-mail" type="email" value={email} onChange={(event)=> setEmail(event.target.value)} required/>
        <input disabled={loading} data-test="password" placeholder="Senha" type="password" autoComplete ="new-password" value={password} onChange={(event)=> setPassword(event.target.value)} required/>
        <button disabled={loading} data-test="sign-in-submit" type="submit">
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
            <>Entrar</>
          }
        </button>
      </form>

      <Link to={'/cadastro'}>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  button{
    height: 46px;
    display: flex;
    justify-content: center;
  }
`
