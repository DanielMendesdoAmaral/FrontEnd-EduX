import React from "react";
import { Navbar, Nav, Container, Col, Row } from "react-bootstrap";
import logo from "../../images/logo.png";

const Menu = () => {
    const renderizarAbas = () => {
        const token = localStorage.getItem("token-edux");

        if(token===null) {
            return (
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Início</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/login">Entrar</Nav.Link>
                        <Nav.Link href="/cadastrar">Cadastrar-se</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            )
        }
        else {
            return (
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Início</Nav.Link>
                        <Nav.Link href="/dicas">Dicas</Nav.Link>
                        <Nav.Link href="/turmas">Turmas</Nav.Link>
                        <Nav.Link href="/objetivos">Objetivos</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/dicas">Sair</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            )
        }
    }

    return (
       <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/"><img src={logo} alt="Logo EDUX" style={{width: "100px"}}/></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                {renderizarAbas()}
            </Navbar>
            <Row style={{width: "100vw"}}>
                <Col xs="3" style={{background: "#00d65f", height: "3px"}}></Col>
                <Col xs="3" style={{background: "#ff271c", height: "3px"}}></Col>
                <Col xs="3" style={{background: "#f9e800", height: "3px"}}></Col>
                <Col xs="3" style={{background: "#00c2ee", height: "3px"}}></Col>
            </Row>
        </div>
    )
}

export default Menu;