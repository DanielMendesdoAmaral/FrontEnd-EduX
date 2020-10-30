import React, { useState, useEffect } from "react";
import {Form, Button, Container, Row, Col, Card, Navbar, Nav} from "react-bootstrap";
import logo from "../../images/logo.png";
import {url} from "../../utils/constants";
import {useHistory} from "react-router-dom";

const Cadastro = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [perfis, setPerfis] = useState([]);

    useEffect(() => {
        pegarPerfis();
    }, []);

    const pegarPerfis = () => {
        fetch(`${url}/perfil`)
        .then(response => response.json())
        .then(dados => {
            setPerfis(dados);
        })
        .catch(err => alert(err + ". Mande um email para a nossa equipe de suporte: eventos.suport@gmail.com"));
    }

    const history = useHistory();

    const logar = () => {
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
        .then(response => {
            if(response.ok) 
                return response.json();
        })
        .then(data => {
            localStorage.setItem("token-edux", data.token);
            history.push("/")
        })
        .catch(err => {
            console.log(err);
        });
    }

    const cadastrar = (event) => {
        event.preventDefault();

        let id = perfis.filter(perfil => perfil.permissao=="Aluno").map(perfil => perfil.id).toString();

        let usuario = {
            nome: nome,
            email: email,
            senha: senha,
            idPerfil: id,
            dataUltimoAcesso: null
        }

        fetch(`${url}/usuario`, {
            method: "POST",
            body: JSON.stringify(usuario),
            headers: {
                "content-type": "application/json"
            } 
        })
        .then(response => {
            response.json();
            logar();
        })
        .catch(err => console.log(err));
    }

    return (
        <Container>
            <Row className="justify-content-md-center" style={{display: "flex", alignItems: "center", height: "100vh"}}>
                <Col md="auto">
                    <Card style={{borderTop: "solid 1.5px #00d65f", borderRight: "solid 1.5px #ff271c", borderBottom: "solid 1.5px #f9e800", borderLeft: "solid 1.5px #00c2ee"}}>
                        <Card.Body>
                            <Navbar.Brand href="/">
                                <img
                                    src={logo}
                                    width="50%"
                                    className="center"
                                    alt="Logo EDUX."
                                    style={{margin: "auto", display: "block"}}
                                />
                            </Navbar.Brand>
                            <Card.Title style={{textAlign: "center", padding: "10px"}}>Cadastro</Card.Title>
                            <Form onSubmit={event => cadastrar(event)}>
                                <Form.Group>
                                    <Form.Control type="text" placeholder="Nome" value={nome} onChange={event => setNome(event.target.value)} />
                                    <Form.Control type="email" placeholder="Email" value={email} onChange={event => setEmail(event.target.value)} />
                                    <Form.Control type="password" placeholder="Senha" value={senha} onChange={event => setSenha(event.target.value)} />
                                </Form.Group>
                                <Button variant="primary" type="submit" style={{margin: "auto", display:"block", width: "100%"}}>Cadastrar</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <p style={{display: "flex", justifyContent: "center", paddingTop: "10px"}}>Já é cadastrado? <Nav.Link href="/login" style={{padding: "0 4px"}}>Faça login!</Nav.Link></p>
                </Col>
            </Row>
        </Container>
    )
}

export default Cadastro;