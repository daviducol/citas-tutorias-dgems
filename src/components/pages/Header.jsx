import React, { useContext } from 'react'
import { LoginContext } from '../../context/LoginContext'
import { Logout } from '../auth/Logout';

export const Header = () => {
    const { login } = useContext(LoginContext);



    return (
        <>

            <div>
                <nav className="navbar navbar-light bg-dgems">
                    <div className="container-fluid">
                        <span className="header_text">Tutorias DGEMS</span>
                        {
                            (login.length !== 0)
                            &&
                            (
                                <div className="d-flex justify-content-end">
                                    <img src={login.imageUrl} alt="avatar" style={{ height: 30, marginRight: 10 }} className="rounded-circle" />
                                    <Logout />

                                </div>

                            )


                        }
                    </div>
                </nav>
            </div>
        </>
    )
}
