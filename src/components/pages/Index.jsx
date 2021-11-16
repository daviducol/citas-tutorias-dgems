import { Login } from "../auth/Login"
import { Header } from "./Header"

export const Index = () => {
    return (
        <>
           <Header />
            <div className="index__caja">
                <div className="row">
                    <div className="col">
                        <h1 className="index__titulo">Tutorías de apoyo a los estudiantes en la asignatura de Matemáticas I</h1>
                    </div>
                </div>
            </div>
            <div className="container mt-5 container_texto">
                <h3>Bienvenida</h3>
                <p className="index__texto">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lacinia mi magna, cursus molestie urna facilisis vitae. Aenean a maximus velit. Phasellus cursus elit id venenatis feugiat. Morbi dui metus, tristique cursus consectetur eu, aliquam a ipsum. Curabitur semper vitae ex non dictum. Nam velit lacus, aliquam vitae lectus sit amet, vehicula finibus arcu. Quisque maximus diam tortor, in tincidunt mi placerat ut. Duis iaculis velit id sem sollicitudin hendrerit. In id gravida nisl. Praesent sagittis molestie efficitur. Nunc quis risus vitae elit ultrices ultricies. Donec placerat eget enim a suscipit. Ut eget felis lacus. Quisque dignissim dapibus metus. Nam ornare arcu odio, nec interdum sapien mattis sed.
                </p>
                <p className="index__texto">
                    Aliquam vel commodo nisl. Nulla aliquet nisi sapien, a posuere sem aliquam ac. Morbi vehicula viverra justo eu placerat. Fusce a porttitor justo, aliquet semper felis. Duis sed felis in augue porttitor facilisis non id elit. Cras sed tempus turpis. Donec et justo in enim rhoncus fermentum. Morbi dictum est massa, eu sollicitudin ex tincidunt id. In ac nulla ut arcu molestie viverra. Phasellus eget fermentum urna. In hac habitasse platea dictumst. Morbi a nisl lacus. In hac habitasse platea dictumst. Ut dignissim tellus vehicula dui lacinia, eu sagittis ante finibus. Vivamus ac tellus ut nibh fringilla interdum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                </p>
            </div>
            <div className="d-flex justify-content-center mt-5">
                <Login />

            </div>
        </>
    )
}
