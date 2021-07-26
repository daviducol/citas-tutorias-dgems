import { createContext, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {

    const [login, setLogin] = useState([])
    const [alumno, setAlumno] = useState([])
    const [maestros, setMaestros] = useState([])

    return (
        <LoginContext.Provider value={{ login, setLogin, alumno, setAlumno, maestros, setMaestros }}>
            {children}
        </LoginContext.Provider>
    )


}