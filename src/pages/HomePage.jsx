import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { Context } from "../components/Context"
import ListItemContainer from "../components/ListItemContainer"
import { useNavigate } from "react-router-dom"

export default function HomePage() {

  const navigate = useNavigate()

  const {token} = useContext(Context)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const [username, setUserName] = useState("")
  const [transactions, setTransactions] = useState([])
  let saldo = 0

  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_API_URL}/transactions`, config)
      .then((resposta)=>{
        setUserName(resposta.data.user.name)
        setTransactions(resposta.data.transactions.reverse())
      })
      .catch((erro)=>{
        console.log(erro)
      })
  }, [])

  transactions.forEach((transaction)=>{
    if(transaction.type === "entrada"){
      saldo += Number(transaction.value)
    }else{
      saldo -= Number(transaction.value)
    }
  })

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {username}</h1>
        <BiExit />
      </Header>

      <TransactionsContainer>
        <ul>
          {transactions.map((transaction)=><ListItemContainer key={transaction._id} day={transaction.date} description={transaction.description} value={transaction.value} type={transaction.type}/>)}
        </ul>
        <article>
          <strong>Saldo</strong>
          <Value color={saldo >= 0 ? "positivo" : "negativo"}>{saldo}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button onClick={()=>navigate("/nova-transacao/entrada")}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={()=>navigate("/nova-transacao/saida")}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`