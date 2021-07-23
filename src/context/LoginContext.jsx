import { createContext, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {

    const [login, setLogin] = useState([])
    const [alumno, setAlumno] = useState([])

    return (
        <LoginContext.Provider value={{ login, setLogin, alumno, setAlumno }}>
            {children}
        </LoginContext.Provider>
    )


}