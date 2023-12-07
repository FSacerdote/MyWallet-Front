import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { Context } from "../context/Context"
import Swal from "sweetalert2"
import { ThreeDots } from 'react-loader-spinner'

export default function SignUpPage() {

  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setConfirmation] = useState("")
  const {token} = useContext(Context)

  const [loading, setLoading] = useState(false)

  function fireSweetAlertError(text){
    return Swal.fire({
      title: 'Error!',
      text,
      icon: 'error'
    })
  }

  function signup(event){
    event.preventDefault()
    setLoading(true)
    if(password.length < 3 ){
      setLoading(false)
      return fireSweetAlertError("A senha deve ter no minimo 3 caracteres")
    } else if(password !== passwordConfirmation){
      setLoading(false)
      return fireSweetAlertError("A senha deve ser igual a confirmação de senha")
    } else{
      axios.post(`${import.meta.env.VITE_API_URL}/sign-up`, {name, email, password})
        .then(()=>{
          setLoading(false)
          navigate("/")
        })
        .catch((error)=>{
          setLoading(false)
          if(error.response.status === 409) return fireSweetAlertError("Este email já é cadastrado")
          if(error.response.status === 422) return fireSweetAlertError("Dados inválidos, por favor tente novamente")
          fireSweetAlertError("Erro ao realizar o cadastro")
        })
    }
  }

  function handleInvalidForm(event){
    event.preventDefault()
    fireSweetAlertError("Preencha todos os campos corretamente, por favor!")
  }

  return (
    <SingUpContainer>
      <form onSubmit={signup} onInvalid={handleInvalidForm}>
        <MyWalletLogo />
        <input disabled={loading} data-test="name" placeholder="Nome" type="text" value={name} onChange={(event)=> setName(event.target.value)} required/>
        <input disabled={loading} data-test="email" placeholder="E-mail" type="email" value={email} onChange={(event)=> setEmail(event.target.value)} required/>
        <input disabled={loading} data-test="password" placeholder="Senha" type="password" autoComplete="new-password" value={password} onChange={(event)=> setPassword(event.target.value)} required/>
        <input disabled={loading} data-test="conf-password" placeholder="Confirme a senha" type="password" autoComplete="new-password" value={passwordConfirmation} onChange={(event)=> setConfirmation(event.target.value)} required/>
        <button disabled={loading} data-test="sign-up-submit" type="submit">
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
            <>Cadastrar</>
          }
        </button>
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
  button{
    height: 46px;
    display: flex;
    justify-content: center;
  }
`
