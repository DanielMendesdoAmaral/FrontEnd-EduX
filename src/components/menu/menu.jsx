import React from "react";
import { Navbar, Nav, Container, Col, Row } from "react-bootstrap";
import logo from "../../images/logo.png";

const Menu = () => {
    return (
        <Container>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/"><img src={logo} alt="Logo EDUX" style={{width: "100px"}}/></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Início</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/login">Entrar</Nav.Link>
                        <Nav.Link href="/cadastrar">Cadastrar-se</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Row>
                <Col xs="3" style={{background: "#00d65f", height: "1.5px"}}></Col>
                <Col xs="3" style={{background: "#ff271c", height: "1.5px"}}></Col>
                <Col xs="3" style={{background: "#f9e800", height: "1.5px"}}></Col>
                <Col xs="3" style={{background: "#00c2ee", height: "1.5px"}}></Col>
            </Row>
        </Container>
    )
}

export default Menu;