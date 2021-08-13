import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { Alumnos } from '../components/pages/Alumnos';
import { Citas } from '../components/pages/Citas';
import { Historial } from '../components/pages/Historial';
import { Index } from '../components/pages/Index';
import { Maestros } from '../components/pages/Maestros';
import { Admin } from '../components/pages/Admin';
import { CitaAgendada } from '../components/pages/CitaAgendada';

export const CitasRouter = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Index}></Route>
                <Route exact path="/alumnos" component={Alumnos}></Route>
                <Route exact path="/maestros" component={Maestros}></Route>
                <Route exact path="/cita" component={Citas}></Route>
                <Route exact path="/admin" component={Admin}></Route>
                <Route exact path="/historial" component={Historial}></Route>
                <Route exact path="/cita-agendada" component={CitaAgendada}></Route>
                <Redirect to="/" />
            </Switch>
        </Router>
    )
}

