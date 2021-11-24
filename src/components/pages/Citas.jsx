import React, { useContext } from 'react'
import { Redirect, useHistory } from 'react-router-dom';

import Swal from 'sweetalert2';
import { LoginContext } from '../../context/LoginContext';
import { Header } from './Header'
import { useForm } from '../../hooks/useForm';
import { temas } from '../../helpers/escuelas';




export const Citas = () => {

    const history = useHistory();
    // const [error, setError] = useState(false);

    const temasMate = temas;

    const { login: data, alumno: estudiante, setLogin, setAlumno, maestros: dataMaestros } = useContext(LoginContext);

    let date = new Date()
    let fechaActual;
    const day = date.getDate() + 1;
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    // const semana = date.get();
    // console.log(semana);

    if (month > 9) {
        fechaActual = `${year}-${month}-${day}`;
    } else if (day > 9) {
        fechaActual = `${year}-0${month}-${day}`;
        // console.log(fechaActual);
    } else {
        fechaActual = `${year}-0${month}-0${day}`;
    }
    const numDia = (fecha) => {
        const dias = [
            'lunes',
            'martes',
            'miercoles',
            'jueves',
            'viernes',
            'sabado',
            'domingo',
        ];
        const numeroDia = new Date(fecha).getDay();
        const nombreDia = dias[numeroDia];
        // console.log(numeroDia)
        // console.log(nombreDia)
        return nombreDia;
    }
    const numDia2 = (fecha) => {

        const numeroDia = new Date(fecha).getDay();


        return numeroDia;
    }
    // console.log(dataMaestros)

    const [formState, handlerOnChange] = useForm({
        alumno: data.familyName,
        apellidos: data.givenName,
        maestro: '',
        fecha: fechaActual,
        tema: '',
        hora: '',
        bachillerato: estudiante.bachillerato,
        grado: estudiante.grado,
        grupo: estudiante.grupo
    })
    // const bachilleratos = escuelas;

    const agendarCita = async (ev) => {
        ev.preventDefault();
        // console.log(dataMaestros);
        // console.log(maestro);

        const numLiga = numDia2(formState.fecha)


        const clave = dataMaestros.maestros.filter(resp => (`${resp.apellidos.trim()} ${resp.nombre.trim()}` === maestro.trim()))
        // console.log(clave);
        // console.log(clave[0].ligasMeet);
        const crearCita = {
            ...formState,
            // ligasMeet: 'https://meet.google.com/xzn-ycxd-qjo?authuser=0',
            ligasMeet: `${clave[0].ligasMeet[numLiga]}`,
            correoAlumno: estudiante.email,
            numTrabajador: clave[0].numTrabajador,
        }
        // console.log(crearCita);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(crearCita)
        }
        const eviarCorreo = {
            correo: estudiante.email,
            alumno: `${formState.alumno} ${formState.apellidos}`,
            tema: formState.tema,
            bachillerato: formState.bachillerato,
            correoDocente: clave[0].correo,
            ligaMeet: `${clave[0].ligasMeet[numLiga]}`,
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
        await response.json();
        // console.log(dataCita);
        // console.log(response.status);
        // console.log(responseEmail.status);
        // console.log(dataEmail);
        if (response.status === 200) {
            // console.log('ingreso')
            const responseEmail = await fetch('https://citas-tutorias-dgems.herokuapp.com/api/correo/send-email', requestEmail); // Production
            // const responseEmail = await fetch('http://192.168.0.13:3500/api/correo/send-email', requestEmail); // Desarrollo
            // console.log(eviarCorreo);
            await responseEmail.json();
            setLogin([]);
            setAlumno([]);
            // Swal.fire({
            //     icon: 'success',
            //     title: 'Cita agendada',
            //     text: 'verifica tu correo',
            //     showConfirmButton: false,
            //     timer: 2000,
            //     allowOutsideClick: false
            // });
            history.replace('/cita-agendada');
            // setTimeout(()=>{
            // },5000)
        } else {
            // setError(true)
            Swal.fire({
                icon: 'error',
                title: 'Horario no disponible',
                text: 'Intenta en entro horario',
                showConfirmButton: false,
                timer: 2800,
                allowOutsideClick: false
            });
            // setTimeout(() => {
            //     setError(false)
            // }, 3500)
        }
        // console.log(data)
    }


    if (!data.familyName) {

        return (
            <Redirect to="/home" />
        );
    }



    const { alumno, apellidos, maestro, tema, fecha, hora, bachillerato, grado, grupo } = formState;

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
                            <select className="form-select" required={true} aria-label="Default select example" id="inputGenero" name="maestro" value={maestro} onChange={handlerOnChange} >
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
                        <label htmlFor="inputFecha" className="col-sm-2 col-form-label">Fecha</label>
                        <div className="col-sm-8">

                            <input type="date" className="form-control" required={true} step="1" min={fechaActual} max="2021-12-04" id="inputFecha" name="fecha" value={fecha} onChange={handlerOnChange} />

                            {/* <select className="form-select" aria-label="Default select example" id="inputFecha" name="fecha" value={fecha} onChange={handlerOnChange} >
                                <option >Selecciona una opción</option>
                                {
                                    dataMaestros.maestros.map((resp) => (`${resp.apellidos} ${resp.nombre}`) === maestro
                                        && resp.asesorias.map((asesoria, index) => {
                                            return <option key={`${asesoria.dia} ${day} `} >{`${asesoria.dia} ${day} `}</option>
                                        }))
                                }
                            </select> */}
                            {/* <p> Próxima cita (solo los lunes): <input type="date" name="proximacita" step="7" min="2015-02-16">
                                <input type="submit" value="Enviar datos"></p> */}
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputHora" className="col-sm-2 col-form-label">Hora</label>
                        <div className="col-sm-8">
                            <select className="form-select" required={true} aria-label="Default select example" id="inputHora" name="hora" value={hora} onChange={handlerOnChange} >
                                <option >Selecciona una opción</option>
                                {

                                    dataMaestros.maestros.map(resp => (`${resp.apellidos} ${resp.nombre}`) === maestro
                                        && resp.asesorias.map(asesoria => {

                                            return asesoria.dia === numDia(fecha)
                                                && asesoria.horario.map(h => <option key={h}>{h}</option>)
                                        }))
                                }
                            </select>

                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputEscuela" className="col-sm-2 col-form-label">Temas</label>
                        <div className="col-sm-8">
                            <select className="form-select" required aria-label="Default select example" id="inputTema" name="tema" value={tema}
                                onChange={handlerOnChange} >
                                <option >Selecciona un tema para la asesoría</option>
                                {
                                    temasMate.map((tema) => (
                                        <option key={tema} value={tema} >{tema}</option>
                                    ))
                                }
                            </select>
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
