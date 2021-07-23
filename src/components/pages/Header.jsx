import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext'
import { Logout } from '../auth/Logout';

export const Header = () => {
    const { login } = useContext(LoginContext);
    const history = useHistory();
    const loginAdmin = () => {
        history.push('/maestros');
    }

    return (
        <>

            <div>
                <nav className="navbar navbar-light bg-dgems">
                    <div className="container-fluid">
                        <span className="header_text">Tutorias DGEMS</span>
                        {
                            (login.length !== 0)
                                ?
                                (
                                    <div className="d-flex justify-content-end">
                                        <img src={login.imageUrl} alt="avatar" style={{ height: 30, marginRight: 10 }} className="rounded-circle" />
                                        <Logout />

                                    </div>

                                )
                                : <div className="d-flex justify-content-end">
                                    <i className="fas fa-cog text-white" onClick={loginAdmin} style={{ cursor: 'pointer', fontSize: 25 }}></i>
                                </div>

                        }
                    </div>
                </nav>
            </div>
        </>
    )
}
