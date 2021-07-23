import React, { useContext } from 'react'
import { LoginContext } from '../../context/LoginContext'

export const Logout = () => {

    const { setLogin, setAlumno } = useContext(LoginContext);
    const cerrarSesion = () => {
        setLogin([])
        setAlumno([]);
    }

    return (
        <>
            <i className="fas fa-sign-out-alt text-danger" onClick={cerrarSesion} style={{ cursor: 'pointer', fontSize: 25 }}></i>
        </>
    )
}
