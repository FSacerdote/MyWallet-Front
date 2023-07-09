import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Context = createContext()

function ContextProvider ({children}){
    const lsToken = localStorage.getItem("token")
    const [token, setToken] = useState(lsToken)

    return(
        <Context.Provider value={{token, setToken}}>
            {children}
        </Context.Provider>
    )
}

export {Context, ContextProvider}