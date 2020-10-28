import React from 'react';
import logo from "../../images/logo.png";

const Rodape = () => {
    return (
         
        <footer className="text-center" style={{marginTop : "70px"}}>
            <img src={logo} alt="Logo EDUX" style={{width: "100px"}}/>
            <small>Desenvolvido por <a href="#">Grupo 7 - Desenvolvimento de sistemas</a></small>
            <br></br>
            <small>Copyright © 2020 EduX. Todos os direitos reservados</small>
        </footer>
    )
}
export default Rodape;
