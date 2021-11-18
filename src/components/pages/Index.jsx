import { Login } from "../auth/Login"
import { Header } from "./Header"

export const Index = () => {
    return (
        <>
            <Header />
            <div className="index__caja">
                <div className="row">
                    <div className="col">
                        <h1 className="index__titulo">Tutorías de apoyo para estudiantes en la asignatura de Matemáticas I</h1>
                    </div>
                </div>
            </div>
            <div className="container mt-5 container_texto">
                <h3 className="index__bienvenida">Bienvenida</h3>
                <p className="index__texto">
                    Bienvenidos a está aplicación web de asesoría para estudiantes del bachillerato de la Universidad de Colima que requieran apoyo con algún tema del área de matemáticas de primer semestre.
                </p>
                <p className="index__texto">
                    El programa de asesorías es un espacio en el cual participan docentes del nivel medio superior de la institución para mejorar tu desempeño académico.
                </p>
            </div>
            <div className="d-flex justify-content-center mt-5 index__btnLogin">
                <Login />

            </div>
        </>
    )
}
