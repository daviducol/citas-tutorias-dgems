import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext';

import { Header } from './Header'
import { useForm } from '../../hooks/useForm';
import { escuelas } from '../../helpers/escuelas';

export const Citas = () => {

    const [formState, handlerOnChange ] = useForm({
        nombre: '',
        apellidos: '',
        maestro: '',
        fecha: '',
        hora: '',
        bachillerato: '',
        grado: '',
        grupo: '',
    })
    const bachilleratos = escuelas; 

    const agendarCita = (ev) => {
        ev.preventDefault();
    }

    const { login: data } = useContext(LoginContext);
    if(!data.familyName){
        console.log(data)
        return (
            <Redirect to="/home" />
        );
    }

    
    
    const {nombre,apellidos,maestro,fecha,hora,bachillerato,grado,grupo } = formState;

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
            {/* Formulario para la cita */}
            <div className="container mt-5">
                <form onSubmit={agendarCita}>
                    <div className="mb-3 row">
                        <label htmlFor="inputGenero" className="col-sm-2 col-form-label">Maestro</label>
                        <div className="col-sm-8">
                            <select className="form-select" aria-label="Default select example" id="inputGenero" name="maestro" value={maestro} onChange={handlerOnChange} >
                                <option >Selecciona una opción</option>
                                <option value="Amilcar">Amilcar David González Bernal</option>
                                <option value="Aline">Aline Monsisvais Garibay</option>
                                <option value="Raul">Raúl González Bernal</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputNombre" className="col-sm-2 col-form-label">Fecha</label>
                        <div className="col-sm-8">
                            <input type="date" min="2021-07-20" max="2021-12-15" className="form-control" id="inputNombre" name="fecha" value={fecha} onChange={handlerOnChange} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputNombre" className="col-sm-2 col-form-label">Hora</label>
                        <div className="col-sm-8">
                            <input type="time" step="1800" min="09:00" max="13:00" required className="form-control" id="inputNombre" name="hora" value={hora} onChange={handlerOnChange} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputNombre" className="col-sm-2 col-form-label">Nombre</label>
                        <div className="col-sm-8">
                            <input type="text" disabled className="form-control" id="inputNombre" name="nombre" value={nombre} onChange={handlerOnChange} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputApellidos" className="col-sm-2 col-form-label">Apellidos</label>
                        <div className="col-sm-8">
                            <input type="text" disabled className="form-control" id="inputApellidos" name="apellidos" value={apellidos} onChange={handlerOnChange}  />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputEscuela" className="col-sm-2 col-form-label">Escuela</label>
                        <div className="col-sm-8">
                            <select className="form-select" aria-label="Default select example" id="inputEscuela" name="bachillerato" value={bachillerato} onChange={handlerOnChange} >
                                <option >Selecciona una opción</option>
                                {
                                    bachilleratos.map((bachi) => (
                                        <option key={bachi.escuela} value={bachi.escuela}>{bachi.escuela}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputGrado" className="col-sm-2 col-form-label">Semestre</label>
                        <div className="col-sm-8">
                            <select className="form-select" aria-label="Default select example" id="inputGrado" name="grado" value={grado} onChange={handlerOnChange} >
                                <option >Selecciona una opción</option>
                                <option value="1er">Primer semestre</option>
                                <option value="3er">Tercer semestre</option>
                                <option value="5to">Quinto semestre</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputGrupo" className="col-sm-2 col-form-label">Grupo</label>
                        <div className="col-sm-8">
                            <select className="form-select" aria-label="Default select example" id="inputGrupo" name="grupo" value={grupo} onChange={handlerOnChange} >
                                <option >Selecciona una opción</option>
                                <option value="A">Grupo A</option>
                                <option value="B">Grupo B</option>
                                <option value="C">Grupo C</option>
                            </select>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center mt-5 mb-5">
                    <button type="submit" className="btn btn-success">Agendar cita</button>
                </div>
                </form>
                
            </div>
            
        </>
    )
}
