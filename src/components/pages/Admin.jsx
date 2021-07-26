import React from 'react'
import { Link } from 'react-router-dom'
import { Header } from './Header'

export const Admin = () => {
    return (
        <>
            <Header />
            <Link to="/historial">Historial</Link>
            <br />
            <br />
            <Link to="/maestros">Registrar maestro</Link>
        </>
    )
}
