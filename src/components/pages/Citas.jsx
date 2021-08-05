import React, { useContext, useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext';

import { Header } from './Header'
import { useForm } from '../../hooks/useForm';




export const Citas = () => {
    const history = useHistory();
    const [error, setError] = useState(false);


    const { login: data, alumno: estudiante, setLogin, setAlumno, maestros: dataMaestros } = useContext(LoginContext);

    let date = new Date()
    let fechaActual;
    const day = date.getDate() + 1;
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    console.log(month);

    if (month > 9) {
        fechaActual = `${year}-${month}-${day}`;
    } else if (day > 9 ){
        fechaActual = `${year}-0${month}-${day}`;
        console.log(fechaActual);
    }else{
        fechaActual = `${year}-0${month}-0${day}`;
    }

    // console.log(dataMaestros)

    const [formState, handlerOnChange] = useForm({
        alumno: data.familyName,
        apellidos: data.givenName,
        maestro: '',
        fecha: '',
        hora: '09:00',
        bachillerato: estudiante.bachillerato,
        grado: estudiante.grado,
        grupo: estudiante.grupo
    })
    // const bachilleratos = escuelas;

    const agendarCita = async (ev) => {
        ev.preventDefault();
        console.log(dataMaestros);
        console.log(maestro);

        const clave = dataMaestros.maestros.filter(resp => (`${resp.apellidos.trim()} ${resp.nombre.trim()}` === maestro.trim()))
        console.log(clave);

        const crearCita = {
            ...formState,
            ligasMeet: 'http://liga1.com.mx',
            correoAlumno: estudiante.email,
            numTrabajador: clave[0].numTrabajador,
        }
        console.log(crearCita);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(crearCita)
        }
        const eviarCorreo = {
            correo: estudiante.email,
            ligaMeet: 'http://liga1.com.mx',
            maestro: formState.maestro,
            fecha: formState.fecha,
            hora: formState.hora,
        }
        const requestEmail = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eviarCorreo)
        }
        // const response = await fetch('https://citas-tutorias-dgems.herokuapp.com/api/alumnos', requestOptions);
        const response = await fetch('https://citas-tutorias-dgems.herokuapp.com/api/citas', requestOptions);
        const dataCita = await response.json();
        console.log(dataCita);
        // console.log(response.status);
        // console.log(responseEmail.status);
        // console.log(dataEmail);
        if (response.status === 200) {
            console.log('ingreso')
            const responseEmail = await fetch('https://citas-tutorias-dgems.herokuapp.com/api/correo/send-email', requestEmail);
            await responseEmail.json();
            setLogin([]);
            setAlumno([]);
            history.replace('/home');
        } else {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 3500)
        }
        console.log(data)
    }


    if (!data.familyName) {

        return (
            <Redirect to="/home" />
        );
    }



    const { alumno, apellidos, maestro, fecha, hora, bachillerato, grado, grupo } = formState;

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
                {
                    (error) && (
                        <div className="alert alert-danger text-center animate__animated animate__fadeIn" role="alert">
                            <strong> Horario no disponible</strong>
                        </div>
                    )
                }

                <form onSubmit={agendarCita}>
                    <div className="mb-3 row">
                        <label htmlFor="inputGenero" className="col-sm-2 col-form-label">Maestro</label>
                        <div className="col-sm-8">
                            <select className="form-select" aria-label="Default select example" id="inputGenero" name="maestro" value={maestro} onChange={handlerOnChange} >
                                <option >Selecciona una opción</option>
                                {
                                    dataMaestros.maestros.map((resp) => (
                                        <option key={resp._id} value={`${resp.apellidos} ${resp.nombre}`}>{`${resp.apellidos} ${resp.nombre}`}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputNombre" className="col-sm-2 col-form-label">Fecha</label>
                        <div className="col-sm-8">
                            <input type="date" min={`${fechaActual}`} max="2021-12-15" className="form-control" id="inputNombre" name="fecha" value={fecha} onChange={handlerOnChange} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputNombre" className="col-sm-2 col-form-label">Hora</label>
                        <div className="col-sm-8">
                            <input type="time" step="1800" min="09:00" max="13:00" required className="form-control" id="inputNombre" name="hora" value={hora} onChange={handlerOnChange} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputAlumno" className="col-sm-2 col-form-label">Nombre</label>
                        <div className="col-sm-8">
                            <input type="text" disabled className="form-control" id="inputAlumno" name="alumno" value={alumno} onChange={handlerOnChange} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputApellidos" className="col-sm-2 col-form-label">Apellidos</label>
                        <div className="col-sm-8">
                            <input type="text" disabled className="form-control" id="inputApellidos" name="apellidos" value={apellidos} onChange={handlerOnChange} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputEscuela" className="col-sm-2 col-form-label">Escuela</label>
                        <div className="col-sm-8">
                            <input type="text" disabled className="form-control" id="inputEscuela" name="bachillerato" value={bachillerato} onChange={handlerOnChange} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputGrado" className="col-sm-2 col-form-label">Semestre</label>
                        <div className="col-sm-8">
                            <input type="text" disabled className="form-control" id="inputGrado" name="grado" value={grado} onChange={handlerOnChange} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputGrupo" className="col-sm-2 col-form-label">Grupo</label>
                        <div className="col-sm-8">
                            <input type="text" disabled className="form-control" id="inputGrupo" name="grupo" value={grupo} onChange={handlerOnChange} />
                        </div>
                    </div>
                    {/* <div className="mb-3 row">
                        <label htmlFor="inputNumTrabajador" className="col-sm-2 col-form-label">Trabajador</label>
                        <div className="col-sm-8">
                            {
                                dataMaestros.maestros.map(resp =>
                                    (`${resp.apellidos} ${resp.nombre}` === maestro)
                                    && <input type="text" key={resp.numTrabajador} disabled className="form-control" id="inputNumTrabajador" name="numTrabajador" value={numTrabajador} placeholder={resp.numTrabajador} onChange={handlerOnChange} />

                                )
                            }
                        </div>
                    </div> */}
                    <div className="d-flex justify-content-center mt-5 mb-5">
                        <button type="submit" className="btn btn-success">Agendar cita</button>
                    </div>
                </form>

            </div>

        </>
    )
}
