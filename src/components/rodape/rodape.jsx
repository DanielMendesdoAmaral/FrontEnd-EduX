import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logo from "../../images/logo.png";

const Rodape = () => {
    return (
       <div>
            <Row style={{width: "100vw"}}>
                <Col xs="3" style={{background: "#00d65f", height: "3px"}}></Col>
                <Col xs="3" style={{background: "#ff271c", height: "3px"}}></Col>
                <Col xs="3" style={{background: "#f9e800", height: "3px"}}></Col>
                <Col xs="3" style={{background: "#00c2ee", height: "3px"}}></Col>
            </Row>
            <footer className="text-center" style={{marginTop : "25px"}}>
                <img src={logo} alt="Logo EDUX" style={{width: "100px"}}/>
                <br></br>
                <small>Desenvolvido por <a href="#">Grupo 7 - Desenvolvimento de sistemas</a></small>
                <br></br>
                <small>Copyright © 2020 EduX. Todos os direitos reservados</small>
            </footer>
    </div> 
    )
}
export default Rodape;