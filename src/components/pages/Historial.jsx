import React, { useContext, useState } from 'react'
import { Redirect } from 'react-router-dom';

import { Header } from './Header'
import { LoginContext } from '../../context/LoginContext';
import { useForm } from '../../hooks/useForm';


export const Historial = () => {
    const { login: data, maestros: dataMaestros } = useContext(LoginContext);

    const [showtabla, setShowTabla] = useState(false)
    const [showError, setShowError] = useState(false)
    const [dataHistory, setDataHistory] = useState([])

    const [formState, handlerOnChange] = useForm({
        maestro: '',
    })

    const { maestro } = formState;



    const onHistorialCitas = async (ev) => {
        ev.preventDefault();
        console.log('ingreso')

        setShowTabla(false);
        setShowError(false)
        const clave = dataMaestros.maestros.filter(resp => (`${resp.apellidos.trim()} ${resp.nombre.trim()}` === maestro.trim()))


        const responseHistorial = await fetch(`https://citas-tutorias-dgems.herokuapp.com/api/citas/historial?numTrabajador=${clave[0]?.numTrabajador}`)
        const dataHistorial = await responseHistorial.json();
        console.log(dataHistorial)
        console.log(responseHistorial.status)
        if (responseHistorial.status === 200) {
            setDataHistory(dataHistorial)
            // console.log(dataHistory);
            setShowTabla(true)
            setShowError(false)
        } else {
            setShowTabla(false)
            setShowError(true)
        }
        console.log(dataHistorial.citashistorial);

    }

    if (!data.familyName) {
        return (
            <Redirect to="/home" />
        );
    }
    return (
        <>
            <Header />
            <div className="index__caja">
                <div className="row">
                    <div className="col">
                        <h1 className="index__titulo">Historial de citas por docente</h1>
                    </div>
                </div>
            </div>

            {/* Historial de cita por docente */}
            <div className="container mt-5">
                <form onSubmit={onHistorialCitas}>
                    <div className="mb-3 row">
                        <label htmlFor="inputMaestro" className="col-sm-2 col-form-label">Maestro</label>
                        <div className="col-sm-7">
                            <select className="form-select" aria-label="Default select example" id="inputMaestro" name="maestro" value={maestro} onChange={handlerOnChange} >
                                <option value={'0000'} >Selecciona una opción</option>
                                {
                                    dataMaestros.maestros.map((resp) => (
                                        <option key={resp._id} value={`${resp.apellidos} ${resp.nombre}`}>{`${resp.apellidos} ${resp.nombre}`}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="col-2">
                            <button type="submit" className="btn btn-success"><i className="fas fa-search"></i></button>
                        </div>
                    </div>
                </form>
                {
                    (showtabla)
                    &&
                    <table className="table table-striped mt-5">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Alumno</th>
                                <th>fecha</th>
                                <th>hora</th>
                                <th>Escuela</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dataHistory.citashistorial.map((citasR, index) => (
                                    <tr key={citasR._id}>
                                        <td>{index + 1}</td>
                                        <td>{citasR.alumno} {citasR.apellidos}</td>
                                        <td>{citasR.fecha}</td>
                                        <td>{citasR.hora}</td>
                                        <td>{citasR.bachillerato}</td>
                                    </tr>
                                ))
                            }
                            <tr>
                                <td colSpan="5" className="text-center"><strong><span className="text-primary">{dataHistory.citashistorial.length} </span> </strong>{dataHistory.citashistorial.length > 1 ? 'citas realizadas' : 'cita realizada'} </td>
                            </tr>
                        </tbody>
                    </table>
                }
                {
                    (showError)
                    &&
                    (
                        <div className="alert alert-danger text-center">El docente <strong>{maestro}</strong> no tiene registrada ninguna cita</div>

                    )
                }
            </div>
        </>
    )
}
