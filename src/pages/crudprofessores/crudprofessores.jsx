import React, {useState, useEffect} from "react";
import Titulo from "../../components/titulo/index";
import Menu from "../../components/menu/menu";
import Rodape from "../../components/rodape/rodape";
import {Container, Card, Col, Row, Button, Form, Table} from "react-bootstrap";
import {url} from "../../utils/constants";

const CrudProfessores = () => {
    const [id, setId] = useState("");
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [usuarios, setUsuarios] = useState([]);
    const [perfis, setPerfis] = useState([]);

    const pegarPerfis = () => {
        fetch(`${url}/perfil`)
        .then(response => response.json())
        .then(dados => {
            setPerfis(dados);
        })
        .catch(err => console.log(err));
    }

    const listar = () => {
        fetch(url+"/usuario")
        .then(response => response.json())
        .then(dados => {
            setUsuarios(dados.filter(dado => dado.idPerfil===idPerfil));
            limparCampos();
        })
        .catch(err => console.log(err));
    }

    const limparCampos = () => {
        setId("");
        setNome("");
        setEmail("");
        setSenha("");
    }

    const editar = (event) => {
        event.preventDefault();

        fetch(url + "/usuario/buscar/id" + event.target.value)
        .then(response => response.json())
        .then(dados => {
            setId(dados.data.id);
            setNome(dados.data.nome);
            setEmail(dados.data.email);
            setSenha(dados.data.senha);
        })
        .catch(err => console.log(err));
    }

    const remover = (event) => {
        event.preventDefault();

        fetch(url + "/usuario/" + event.target.value, { 
            method: "DELETE",
            headers: {
                "authorization": "Bearer " + localStorage.getItem("token-edux")
            }
        })
        .then(response => response.json())
        .then(response => {
            listar(); 
        })
        .catch(err => console.log(err));
    }

    let idPerfil = perfis.filter(perfil => perfil.permissao=="Professor").map(perfil => perfil.id).toString();

    const cadastrar = (event) => {
        event.preventDefault();
        console.log(id)

        let usuario = {
            id: id,
            nome: nome,
            email: email,
            senha: senha,
            idPerfil: idPerfil,
            dataUltimoAcesso: null
        }

        let metodo = (id === "" ? "POST" : "PUT");
        let urlPostOuPut = (id === "" ? `${url}/usuario` : `${url}/usuario/${id}`);
    
        fetch(urlPostOuPut, {
            method: metodo,
            body: JSON.stringify(usuario),
            headers: {
                "content-type": "application/json",
                "authorization": "Bearer " + localStorage.getItem("token-edux") 
            } 
        })
        .then(response => response.json())
        .then(response => {
            listar();
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        pegarPerfis();
    }, []);

    return (
        <div>
            <Menu/>
            <Titulo titulo="Gerencie os professores da plataforma" chamada="Cadastre, edite, delete e visalize todos os professores cadastrados na plataforma."/>
            <Container onLoad={listar()}>
                <Row className="justify-content-md-center" style={{display: "flex", alignItems: "center"}}>
                    <Col md="auto">
                        <Card style={{borderTop: "solid 1.5px #00d65f", borderRight: "solid 1.5px #ff271c", borderBottom: "solid 1.5px #f9e800", borderLeft: "solid 1.5px #00c2ee"}}>
                            <Card.Body>
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
                    </Col>
                </Row>
                <Table striped style={{display: "flex", color: "black", justifyContent: "space-around", margin: "100px 0"}}>
                    <tbody>
                        {
                            usuarios.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td style={{height: "40px", width: "40px", borderRadius: "100px", display: "flex", justifyContent: "center", alignItems: "center", background: "#0069D9"}}>{item.nome.substring(0,1).toUpperCase()}</td>
                                        <td>{item.email}</td>
                                        <td>{item.senha}</td>
                                        <td><Button variant="primary" type="button" value={item.id} onClick={event => editar(event)}>Editar</Button><Button variant="danger" type="button" value={item.id} onClick={event => remover(event)} style={{marginLeft: "15px"}}>Remover</Button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Container>
            <Rodape/>
        </div>
    )
}

export default CrudProfessores;