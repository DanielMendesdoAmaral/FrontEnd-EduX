import React, {useState} from "react";
import {Form, Button, Container, Row, Col, Card, Navbar} from "react-bootstrap";
import logo from "../../images/logo.png";
import {url} from "../../components/constants/constants";
import {useHistory} from "react-router-dom";
import jwt_decode from "jwt-decode";

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
        })
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

    return (
        <div style={{background: "#fff"}}>
            <Container>
            <Row className="justify-content-md-center" style={{display: "flex", alignItems: "center", height: "100vh"}}>
                <Col md="auto">
                    <Card style={{background: "#fff", borderTop: "solid 1.5px #00d65f", borderRight: "solid 1.5px #ff271c", borderBottom: "solid 1.5px #f9e800", borderLeft: "solid 1.5px #00c2ee"}}>
                        <Card.Body>
                            <Navbar.Brand href="/login">
                                <img
                                    src={logo}
                                    width="50%"
                                    className="center"
                                    alt="Logo EDUX."
                                    style={{margin: "auto", display: "block"}}
                                />
                            </Navbar.Brand>
                            <Card.Title style={{textAlign: "center", padding: "10px"}}>Faça login</Card.Title>
                            <Form onSubmit={event => logar(event)}>
                                <Form.Group>
                                    <Form.Control type="email" placeholder="Email" value={email} onChange={event=> setEmail(event.target.value)} />
                                    <Form.Control type="password" placeholder="Senha" value={senha} onChange={event => setSenha(event.target.value)} />
                                </Form.Group>
                                <Button variant="primary" type="submit" style={{margin: "auto", display:"block", width: "100%"}}>Entrar</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
            
        </Container>
        </div>
        
        
    )
}

export default Login;