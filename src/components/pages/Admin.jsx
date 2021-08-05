import React from 'react'
import { Link } from 'react-router-dom'
import { Header } from './Header'

export const Admin = () => {
    return (
        <>
            <Header />
            <div className="container mt-5">
                <div className="row row-cols-1 row-cols-md-2 g-4">
                    <div className="col">
                    <Link to="/historial">
                        <div className="card">
                            <div className="card-body text-center">
                                <i className="card-text fas fa-history" style={{ fontSize: 100, color:'green' }}></i>
                            </div>
                            
                        </div>
                    </Link>
                    </div>
                    <Link to="/maestros">
                        <div className="col">
                            <div className="card">
                                <div className="card-body text-center">
                                
                                    <i className="card-text fas fa-user-plus" style={{ fontSize: 100, color:'blue' }}></i>
                                </div>
                                
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
            
            <br />
            <br />
            
        </>
    )
}
