import React, { useState, useEffect } from "react";
import {Form, Button, Container, Row, Col, Card, Navbar} from "react-bootstrap";
import logo from "../../images/logo.png";
import {url} from "../../components/constants/constants";
import jwt_decode from "jwt-decode";
import {useHistory} from "react-router-dom";

const Cadastro = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [idPerfil, setIdPerfil] = useState("");
    const [perfis, setPerfis] = useState([]);

    const history = useHistory();

    const cadastrar = (event) => {
        event.preventDefault();

        let usuario = {
            nome: nome,
            email: email,
            senha: senha,
            idPerfil: idPerfil,
            dataUltimoAcesso: null
        }

        fetch(`${url}/usuario`, {
            method: "POST",
            body: JSON.stringify(usuario),
            headers: {
                "content-type": "application/json"
            } 
        })
        .then(response => response.json())
        .catch(err => alert(err + ". Envie um email para edux.suport@email.com."));

        fetch(`${url}/login`, {
            method: "POST",
            body: JSON.stringify({
                email: email,
                senha: senha
            }),
            headers: {
                "content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem("token-edux", data.token);

            let decoded = jwt_decode(data.token);

            if(decoded==="Aluno")
                history.push("/aluno");
            else if (decoded==="Professor")
                history.push("/professor");
        })
        .catch(err => {
            alert(err + ". Envie um email para edux.suport@email.com.");
        });
    }

    const preencherSelect = () => {
        fetch(`${url}/perfil`)
        .then(response => response.json())
        .then(dados => {
            setPerfis(dados);
        })
        .catch(err => {
            alert(err + ". Envie um email para edux.suport@email.com.")
        })
    }

    useEffect(() => {
        preencherSelect();
    }, []);

    return (
        <Container>
            <Row className="justify-content-md-center" style={{display: "flex", alignItems: "center", height: "100vh"}}>
                <Col md="auto">
                    <Card style={{borderTop: "solid 1.5px #00d65f", borderRight: "solid 1.5px #ff271c", borderBottom: "solid 1.5px #f9e800", borderLeft: "solid 1.5px #00c2ee"}}>
                        <Card.Body>
                            <Navbar.Brand href="/cadastro">
                                <img
                                    src={logo}
                                    width="50%"
                                    className="center"
                                    alt="Logo EDUX."
                                    style={{margin: "auto", display: "block"}}
                                />
                            </Navbar.Brand>
                            <Card.Title style={{textAlign: "center", padding: "10px"}}>Cadastre-se</Card.Title>
                            <Form onSubmit={event => cadastrar(event)}>
                                <Form.Group>
                                    <Form.Control type="text" placeholder="Nome" value={nome} onChange={event => setNome(event.target.value)} />
                                    <Form.Control type="email" placeholder="Email" value={email} onChange={event => setEmail(event.target.value)} />
                                    <Form.Control type="password" placeholder="Senha" value={senha} onChange={event => setSenha(event.target.value)} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Selecione seu tipo de perfil</Form.Label>
                                    <Form.Control as="select" onChange={event => setIdPerfil(event.target.value)}>
                                        <option value={0}>Selecione</option>
                                        {
                                            perfis.map((perfil, index) => {
                                                return (
                                                    <option key={perfil.id} value={perfil.id}>{perfil.permissao}</option>
                                                )
                                            })
                                        }
                                    </Form.Control>
                                </Form.Group>
                                <Button variant="primary" type="submit" style={{margin: "auto", display:"block", width: "100%"}}>Cadastrar</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Cadastro;