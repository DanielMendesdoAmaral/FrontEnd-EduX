import React, {useState} from "react";
import {Form, Button, Container, Row, Col, Card, Navbar, Nav} from "react-bootstrap";
import logo from "../../images/logo.png";
import {url} from "../../utils/constants";
import {useHistory} from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const history = useHistory();

    const logar = (event) => {
        event.preventDefault();

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
            alert("Email ou senha inválida.");
            history.push("/cadastrar");
        })
        .then(data => {
            localStorage.setItem("token-edux", data.token);
            history.push("/");
        })
        .catch(err => {
            console.log(err);
        });
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
                            <Card.Title style={{textAlign: "center", padding: "10px"}}>Login</Card.Title>
                            <Form onSubmit={event => logar(event)}>
                                <Form.Group>
                                    <Form.Control type="email" placeholder="Email" value={email} onChange={event => setEmail(event.target.value)} />
                                    <Form.Control type="password" placeholder="Senha" value={senha} onChange={event => setSenha(event.target.value)} />
                                </Form.Group>
                                <Button variant="primary" type="submit" style={{margin: "auto", display:"block", width: "100%"}}>Entrar</Button>
                            </Form>
                            <Nav.Link style={{padding: "10px 0"}}>Esqueci minha senha</Nav.Link>
                        </Card.Body>
                    </Card>
                    <p style={{display: "flex", justifyContent: "center", paddingTop: "10px"}}>Não é cadastrado? <Nav.Link href="/cadastrar" style={{padding: "0 4px"}}>Cadastre-se!</Nav.Link></p>
                </Col>
            </Row>
        </Container>
    )
}

export default Login;