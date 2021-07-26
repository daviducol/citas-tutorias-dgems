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

export const CitasRouter = () => {
    return (
        <Router>
            <Switch>
                <Route path="/home" component={Index}></Route>
                <Route path="/alumnos" component={Alumnos}></Route>
                <Route path="/maestros" component={Maestros}></Route>
                <Route path="/cita" component={Citas}></Route>
                <Route path="/admin" component={Admin}></Route>
                <Route path="/historial" component={Historial}></Route>
                <Redirect to="/home" />
            </Switch>
        </Router>
    )
}

