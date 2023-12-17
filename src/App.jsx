import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TransactionsPage from "./pages/TransactionPage"
import { ContextProvider } from "./context/Context"

export default function App() {
  return (
    <PagesContainer>
        <BrowserRouter>
          <ContextProvider>
            <Routes>
              <Route path="/" element={<SignInPage />} />
              <Route path="/cadastro" element={<SignUpPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/nova-transacao/:type" element={<TransactionsPage />} />
            </Routes>
          </ContextProvider>
        </BrowserRouter>
      </PagesContainer>
  )
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
`
