import React from "react";
import { Navbar, Nav, Col, Row, Dropdown } from "react-bootstrap";
import logo from "../../images/logo.png";
import jwt_decode from "jwt-decode";
import {useHistory} from "react-router-dom";

const Menu = () => {
    const history = useHistory();

    const sair = (event) => {
        event.preventDefault();

        localStorage.removeItem("token-edux");

        history.push("/");
    }

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
        else if(jwt_decode(token).role==="Instituição") {
            return (
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                        <Nav.Link href="/crudprofessores">Cadastrar professores</Nav.Link>
                    </Nav>
                    <Nav>
                        <Dropdown>
                            <Dropdown.Toggle style={{borderRadius: "1000px", padding: "2px 5px"}} variant="primary" id="dropdown-basic">
                                {jwt_decode(token).nameid.split(" ")[0]}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={event => sair(event)}>Sair</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Navbar.Collapse>
            )
        }
        else {
            return (
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Início</Nav.Link>
                        <Nav.Link href="/timeline">Dicas</Nav.Link>
                        <Nav.Link href="/turmas">Turmas</Nav.Link>
                        <Nav.Link href="/objetivos">Objetivos</Nav.Link>
                    </Nav>
                    <Nav>
                        <Dropdown>
                            <Dropdown.Toggle style={{borderRadius: "1000px", padding: "2px 5px"}} variant="primary" id="dropdown-basic">
                                {jwt_decode(token).nameid.split(" ")[0]}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={event => sair(event)}>Sair</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
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