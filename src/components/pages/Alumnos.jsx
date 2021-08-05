import React, { useContext } from 'react'


import { Redirect, useHistory } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext'
import { escuelas } from '../../helpers/escuelas';
import { useForm } from '../../hooks/useForm';
import { Header } from './Header';

export const Alumnos = () => {

    const { login: data, setAlumno } = useContext(LoginContext);

    const history = useHistory();

    const bachilleratos = escuelas;

    const [formState, handlerOnChange] = useForm({
        nombre: data.familyName,
        apellidos: data.givenName,
        genero: '',
        correo: data.email,
        bachillerato: '',
        grado: '',
        grupo: '',
    })

    const { nombre, apellidos, genero, correo, bachillerato, grado, grupo } = formState;


    if (!data.familyName) {
        console.log(data)
        return (
            <Redirect to="/home" />
        );
    }

    const handlerOnsubmit = async (ev) => {
        ev.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formState)
        }
        // const response = await fetch('https://citas-tutorias-dgems.herokuapp.com/api/alumnos', requestOptions);
        const response = await fetch('https://citas-tutorias-dgems.herokuapp.com/api/alumnos', requestOptions);
        await response.json();
        console.log(response.status);
        if (response.status === 200) {
            console.log('ingreso')
            const { nombre, apellidos, correo: email, bachillerato, grado, grupo } = formState
            const registro = {
                nombre,
                apellidos,
                email,
                bachillerato,
                grado,
                grupo
            }
            setAlumno(registro);
            console.log(registro);
            history.replace('/cita');

        }
        // console.log(data)
    }

    return (
        <>
            <Header />
            <div className="container mt-5">
                <form onSubmit={handlerOnsubmit}>
                    <div className="mb-3 row">
                        <label htmlFor="inputNombre" className="col-sm-2 col-form-label">Nombre</label>
                        <div className="col-sm-8">
                            <input type="text" disabled className="form-control" id="inputNombre" name="nombre" value={nombre} onChange={handlerOnChange} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputApellidos" className="col-sm-2 col-form-label">Apellidos</label>
                        <div className="col-sm-8">
                            <input type="text" disabled className="form-control" id="inputApellidos" name="apellidos" value={apellidos} onChange={handlerOnChange} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputGenero" className="col-sm-2 col-form-label">Genero</label>
                        <div className="col-sm-8">
                            <select className="form-select" aria-label="Default select example" id="inputGenero" name="genero" value={genero} onChange={handlerOnChange} >
                                <option >Selecciona una opción</option>
                                <option value="F">Femenino</option>
                                <option value="M">Masculino</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputCorreo" className="col-sm-2 col-form-label">Correo electrónico</label>
                        <div className="col-sm-8">
                            <input type="email" disabled className="form-control" id="inputCorreo" name="correo" value={correo} onChange={handlerOnChange} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputEscuela" className="col-sm-2 col-form-label">Escuela</label>
                        <div className="col-sm-8">
                            <select className="form-select" aria-label="Default select example" id="inputEscuela" name="bachillerato" value={bachillerato}
                                onChange={handlerOnChange} >
                                <option >Selecciona una opción</option>
                                {
                                    bachilleratos.map((bachi) => (
                                        <option key={bachi.escuela} value={bachi.escuela} >{bachi.escuela}</option>
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
                                {
                                    bachilleratos.map(resp => resp.escuela === bachillerato
                                        && resp.grupos.map(g => <option key={g}>{g}</option>))
                                }
                            </select>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center mt-5 mb-5">
                        <button type="submit" className="btn btn-success">Guardar Datos</button>
                    </div>
                </form>






            </div>
        </>
    )
}
