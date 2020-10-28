import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

//Estilos
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'

//Páginas
import Login from "./pages/login/login";
import Cadastro from "./pages/cadastro/cadastro";
import Menu from "./components/menu/menu";
import Home from "./pages/home/home";

ReactDOM.render(
  <Home/>,
  document.getElementById('root')
);

reportWebVitals();