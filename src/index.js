import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

//Estilos
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'

//Páginas
import Login from "./pages/login/login";

ReactDOM.render(
  <Login/>,
  document.getElementById('root')
);

reportWebVitals();