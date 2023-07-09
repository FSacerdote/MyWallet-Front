import { createContext, useState } from "react";

const Context = createContext()

function ContextProvider ({children}){
    const [token, setToken] = useState()
    return(
        <Context.Provider value={{token, setToken}}>
            {children}
        </Context.Provider>
    )
}

export {Context, ContextProvider}