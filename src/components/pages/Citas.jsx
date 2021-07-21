import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext';

import { Header } from './Header'

export const Citas = () => {
    const { login: data } = useContext(LoginContext);
    if(!data.familyName){
        console.log(data)
        return (
            <Redirect to="/home" />
        );
    }
    return (
        <>
            <Header />
            <div className="index__caja">
                <div className="row">
                    <div className="col">
                        <h1 className="index__titulo">Agendar una cita para turoría</h1>
                    </div>
                </div>
            </div>
        </>
    )
}
