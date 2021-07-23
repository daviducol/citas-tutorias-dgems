import React, { useContext } from 'react'
import { Redirect, useHistory } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext';

import { Header } from './Header'
import { useForm } from '../../hooks/useForm';
// import { escuelas } from '../../helpers/escuelas';

export const Citas = () => {
    const history = useHistory();


    const { login: data, alumno: estudiante, setLogin, setAlumno } = useContext(LoginContext);
    const [formState, handlerOnChange] = useForm({
        alumno: data.familyName,
        apellidos: data.givenName,
        maestro: '',
        fecha: '',
        hora: '',
        bachillerato: estudiante.bachillerato,
        grado: estudiante.grado,
        grupo: estudiante.grupo,
    })
    // const bachilleratos = escuelas;

    const agendarCita = async (ev) => {
        ev.preventDefault();

        const crearCita = {
            ...formState,
            ligasMeet: 'http://liga1.com.mx',
            correoAlumno: estudiante.email
        }
        console.log(crearCita);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(crearCita)
        }
        // const response = await fetch('https://citas-tutorias-dgems.herokuapp.com/api/alumnos', requestOptions);
        const response = await fetch('http://localhost:3500/api/citas', requestOptions);
        const data = await response.json();
        console.log(response.status);
        if (response.status === 200) {
            console.log('ingreso')
            setLogin([]);
            setAlumno([]);
            history.replace('/home');

        }
        console.log(data)
    }


    if (!data.familyName) {
        console.log(data)
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
                    <div className="d-flex justify-content-center mt-5 mb-5">
                        <button type="submit" className="btn btn-success">Agendar cita</button>
                    </div>
                </form>

            </div>

        </>
    )
}
