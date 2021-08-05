import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom';

import { Header } from './Header';
import { useForm } from '../../hooks/useForm';
import { escuelas, escolaridad } from '../../helpers/escuelas';
import { LoginContext } from '../../context/LoginContext';


export const Maestros = () => {
    const { login: data } = useContext(LoginContext);
    const bachilleratos = escuelas;

    const [formState, handlerOnChange, reset] = useForm({
        numTrabajador: '',
        nombre: '',
        apellidos: '',
        dependencia: '',
        telefono: '',
        gradoEstudios: '',
        ligasMeet: '',
        correo: '',
    });

    const { numTrabajador, nombre, apellidos, dependencia, telefono, gradoEstudios, ligasMeet, correo } = formState;


    const handlerOnsubmit = async (ev) => {
        ev.preventDefault();
        var expresionRegular = /\n*;\n*/;
        const separarLigasMeet = ligasMeet.split(expresionRegular)
        // console.log(separarLigasMeet);
        const datosRecuperados = {
            ...formState,
            ligasMeet: separarLigasMeet
        }
        // console.log(datosRecuperados);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosRecuperados)
        }
        // const response = await fetch('https://citas-tutorias-dgems.herokuapp.com/api/alumnos', requestOptions);
        const response = await fetch('https://citas-tutorias-dgems.herokuapp.com/api/maestros', requestOptions);
        const data = await response.json();
        console.log(data);
        console.log(response.status);
        if (response.status === 200) {
            console.log('Datos almacenados DB');
            alert('Datos almacenados');
            reset();
        } else {
            console.log('Error')
        }

    }
    // console.log(data)




    if (!data.familyName) {
        // console.log(data)
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
                        <h1 className="index__titulo">Registro de maestros</h1>
                    </div>
                </div>
            </div>
            {/* Formulario maestros */}
            <div className="container mt-5">
                <form onSubmit={handlerOnsubmit}>
                    <div className="mb-3 row">
                        <label htmlFor="inputNumTrabajador" className="col-sm-2 col-form-label">Número de Trabajador: </label>
                        <div className="col-sm-8">
                            <input type="text" required className="form-control" id="inputNumTrabajador" name="numTrabajador" value={numTrabajador} onChange={handlerOnChange} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputNombre" className="col-sm-2 col-form-label">Nombre: </label>
                        <div className="col-sm-8">
                            <input type="text" required className="form-control" id="inputNombre" name="nombre" value={nombre} onChange={handlerOnChange} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputApellidos" className="col-sm-2 col-form-label">Apellidos: </label>
                        <div className="col-sm-8">
                            <input type="text" required className="form-control" id="inputNombre" name="apellidos" value={apellidos} onChange={handlerOnChange} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputDependencia" className="col-sm-2 col-form-label">Escuela</label>
                        <div className="col-sm-8">
                            <select className="form-select" required aria-label="Default select example" id="inputDependencia" name="dependencia" value={dependencia} onChange={handlerOnChange} >
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
                        <label htmlFor="inputTelefono" className="col-sm-2 col-form-label">Teléfono: </label>
                        <div className="col-sm-8">
                            <input type="number" required className="form-control" id="inputTelefono" name="telefono" value={telefono} onChange={handlerOnChange} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputEstudios" className="col-sm-2 col-form-label">Grado de estudios: </label>
                        <div className="col-sm-8">
                            <select className="form-select" required  aria-label="Default select example" id="inputEstudios" name="gradoEstudios" value={gradoEstudios} onChange={handlerOnChange} >
                                <option >Selecciona una opción</option>
                                {
                                    escolaridad.map((grado) => (
                                        <option key={grado} value={grado}>{grado}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputCorreo" className="col-sm-2 col-form-label">Correo electrónico: </label>
                        <div className="col-sm-8">
                            <input type="email" required className="form-control" id="inputCorreo" name="correo" value={correo} onChange={handlerOnChange} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputLigasMeet" className="col-sm-2 col-form-label">Ligas Meet: </label>
                        <div className="col-sm-8">
                            <textarea required className="form-control" style={{ height: 150, resize: 'none' }} id="inputLigasMeet" name="ligasMeet" value={ligasMeet} onChange={handlerOnChange}>
                            </textarea>
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
