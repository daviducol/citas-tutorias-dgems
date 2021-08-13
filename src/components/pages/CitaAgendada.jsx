import React from 'react'
import { useHistory } from 'react-router-dom'
import { Header } from './Header'

export const CitaAgendada = () => {
    const history = useHistory();
    const finalizarCita = () =>{
        history.replace('/');
    }
    return (
        <>
            <Header />
            <div className="container text-center mt-5">
                <h1 style={{ color:'green' }}>Cita realizada exitosamente</h1>
                <h5 className="mb-5">
                    Verifica la bandeja de tu correo
                </h5>
                <p>
                     <strong>Nota: en caso de no encontrarlo en la bandeja de entrada verificar la sección "spam" en tu correo electrónico</strong>
                </p>
                <button className="btn btn-danger" onClick={finalizarCita}>Finalizar</button>
            </div>
        
        </>
    )
}
