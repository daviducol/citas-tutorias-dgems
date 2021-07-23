import React from 'react'
import { useContext } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext';


export const Login = () => {

    const history = useHistory();

    const { setLogin, setAlumno } = useContext(LoginContext);

    const responseGoogle = async (resp) => {
        if (!resp.profileObj) {
            return console.log('error',)
        }
        setLogin(resp.profileObj)
        // console.log(resp.profileObj)


        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }
        const response = await fetch(`http://localhost:3500/api/alumnos/email?correo=${resp.profileObj.email}`, { requestOptions });
        // const response = await fetch(`https://citas-tutorias-dgems.herokuapp.com/api/alumnos/email?correo=${resp.profileObj.email}`, { requestOptions });
        const data = await response.json();
        console.log(response);
        console.log(data);
        if (data.err) {
            console.log('exite correo')
            console.log(data.estudiante);
            setAlumno(data.estudiante);

            history.replace('/cita');
        } else {
            history.push('/alumnos');
        }


    }
    // const logout = (res) => {
    //     console.log(res)
    // }

    return (
        <>
            <GoogleLogin
                clientId="446921114847-4siqf6e68ke3pngpllouehr5sr47luto.apps.googleusercontent.com"
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
