import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { Context } from "../context/Context"
import ListItemContainer from "../components/ListItemContainer"
import { useNavigate } from "react-router-dom"
import { TailSpin } from 'react-loader-spinner'

export default function HomePage() {

  const navigate = useNavigate()

  const { token, setToken } = useContext(Context)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const [username, setUserName] = useState("")
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)

  let saldo = 0

  useEffect(() => {
    setLoading(true)
    if (!token) {
      navigate("/")
    }
    axios.get(`${import.meta.env.VITE_API_URL}/transactions`, config)
      .then((response) => {
        setLoading(false)
        setUserName(response.data.user.name)
        setTransactions(response.data.transactions.reverse())
      })
      .catch((error) => {
        setLoading(false)
        console.log(error)
      })
  }, [])

  transactions.forEach((transaction) => {
    if (transaction.type === "entrada") {
      saldo += Number(transaction.value)
    } else {
      saldo -= Number(transaction.value)
    }
  })

  function logout(){
    setToken(null)
    localStorage.clear()
    navigate("/")
  }

  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">
          {
          loading?
          "Carregando..."
          :
          `Olá, ${username}`
          }
        </h1>
        <BiExit data-test="logout" onClick={logout}/>
      </Header>

      <TransactionsContainer>
        {
        loading?
        <Loading>
            <TailSpin width="100" height="100" color="#8c11be"/>
        </Loading>
        :
        <>
          <ul>
            {transactions.map((transaction) => <ListItemContainer key={transaction._id} day={transaction.date} description={transaction.description} value={transaction.value} type={transaction.type} />)}
          </ul>
          <article>
            <strong>Saldo</strong>
            <Value data-test="total-amount" color={saldo >= 0 ? "positivo" : "negativo"}>{saldo.toFixed(2)}</Value>
          </article>
        </>
        }
      </TransactionsContainer>


      <ButtonsContainer>
        <button disabled={loading} data-test="new-income" onClick={() => navigate("/nova-transacao/entrada")}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button disabled={loading} data-test="new-expense" onClick={() => navigate("/nova-transacao/saida")}>
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
  height: 95%;
  width: 90%;
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

const Loading = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;
`