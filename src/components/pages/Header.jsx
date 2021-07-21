import React , {useContext} from 'react'
import { useEffect } from 'react';
import { LoginContext } from '../../context/LoginContext'

export const Header = () => {
    const { login } = useContext(LoginContext);
    
    useEffect(()=>{
        
        console.log('Headers',login);
    },[login])

    return (
        <>
        
        <div>
            <nav className="navbar navbar-light bg-dgems">
                <div className="container-fluid">
                    <span className="header_text">Tutorias DGEMS</span>
                    {
                        (login.length !== 0) && <img src={login.imageUrl} alt="avatar" style={{ height:40 }} className="rounded-circle" />
                            
                    }
                </div>
            </nav>
        </div>
        </>
    )
}
