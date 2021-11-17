import React from 'react'
import { useContext } from 'react';
import Swal from 'sweetalert2';

import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext';


export const Login = () => {

    const history = useHistory();

    const { setLogin, setAlumno, setMaestros } = useContext(LoginContext);

    const responseGoogle = async (resp) => {
        if (!resp.profileObj) {
            return console.log('error', resp)
        }

        // console.log(resp)
        // console.log(resp.profileObj)


        // if((resp.profileObj.email).includes('ucol.mx')){
        //     console.log('CORREO UNIVERSITARIO');
        // }else{
        //     console.log('CORREO EXTERNO');
        // }

        if (resp.profileObj.email === 'davidglez.ucol@gmail.com') {
            setLogin(resp.profileObj)
            const responseMaestros = await fetch('https://citas-tutorias-dgems.herokuapp.com/api/maestros');
            const dataMaestros = await responseMaestros.json();
            setMaestros(dataMaestros)
            history.replace('/admin');
        } else if ((resp.profileObj.email).includes('ucol.mx')) {
            setLogin(resp.profileObj)
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }
            const response = await fetch(`https://citas-tutorias-dgems.herokuapp.com/api/alumnos/email?correo=${resp.profileObj.email}`, { requestOptions });
            // const response = await fetch(`https://citas-tutorias-dgems.herokuapp.com/api/alumnos/email?correo=${resp.profileObj.email}`, { requestOptions });
            const responseMaestros = await fetch('https://citas-tutorias-dgems.herokuapp.com/api/maestros');
            const dataMaestros = await responseMaestros.json();

            // console.log(dataMaestros);
            const data = await response.json();
            // console.log(response);
            // console.log(data);
            setMaestros(dataMaestros)

            if (data.err) {
                // console.log('exite correo')
                // console.log(data.estudiante);
                setAlumno(data.estudiante);

                history.replace('/cita');
            } else {
                history.push('/alumnos');
            }

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error en el correo',
                text: 'Intenta mediante un correo institucional',
                showConfirmButton: true,
                allowOutsideClick: false
            });
        }



    }
    // const logout = (res) => {
    //     console.log(res)
    // }

    return (
        <>
            <GoogleLogin
                clientId="446921114847-7tc235a9nk94mvpdgfhv9on3nqp3nbpm.apps.googleusercontent.com" // Produccion
                // clientId="446921114847-4siqf6e68ke3pngpllouehr5sr47luto.apps.googleusercontent.com" // Desarrollo
                buttonText="Iniciar Sesión"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
            {/* <GoogleLogout
                clientId="446921114847-4siqf6e68ke3pngpllouehr5sr47luto.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={logout}
            >
            </GoogleLogout> */}
        </>
    )
}

/*
secreto cliente
YHutYr5DY0rQ_e8i4nhBM778
*/
