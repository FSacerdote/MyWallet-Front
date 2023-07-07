import { createContext, useState } from "react";

const Context = createContext()

function ContextProvider ({children}){
    const [user, setUser] = useState()
    return(
        <Context.Provider value={{user, setUser}}>
            {children}
        </Context.Provider>
    )
}

export {Context, ContextProvider}