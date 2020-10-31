import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import jwt_decode from "jwt-decode";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

//Estilos
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'

//Páginas
import Login from "./pages/login/login";
import Cadastro from "./pages/cadastro/cadastro";
import Inicio from "./pages/inicio/inicio";
import CrudProfessores from "./pages/crudprofessores/crudprofessores";
import NaoEncontrada from "./pages/404/404";
import TimeLine from "./pages/timeline/timeline";
import Turmas from "./pages/turmas/turmas";

const RotaPrivada = ({component : Component, ...rest}) => (
  <Route
    {...rest} 
    render= {
      props => 
      localStorage.getItem("token-edux") === null ?
        <Redirect to={{pathname: "/login", state: {from: props.location}}}/> :
        <Component {...props}/>
    }
  />
);

const RotaPrivadaInstituicao = ({component : Component, ...rest}) => (
  <Route
    {...rest}
    render= {
      props => 
      localStorage.getItem("token-edux") !== null && jwt_decode(localStorage.getItem("token-edux")).role === "Instituição" ?
        <Component {...props}/> :
        <Redirect to={{pathname: "/login", state: {from: props.location}}}/>
    }
  />
);

const routing = (
  <Router>
    <Switch>
      <Route exact path="/" component={Inicio}/> 
      <Route path="/login" component={Login}/>
      <Route path="/cadastrar" component={Cadastro}/> 
      <RotaPrivada path="/timeline" component={TimeLine}/>
      <RotaPrivada path="/turmas" component={Turmas}/>
      <RotaPrivadaInstituicao path="/crudprofessores" component={CrudProfessores}/>
      <Route component={NaoEncontrada}/>
    </Switch>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

reportWebVitals();