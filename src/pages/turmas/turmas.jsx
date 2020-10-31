import React, {useState, useEffect} from "react";
import Rodape from "../../components/rodape/rodape";
import Menu from "../../components/menu/menu";
import Titulo from "../../components/titulo/index";
import jwt_decode from "jwt-decode";
import {url} from "../../utils/constants";
import {Card, Accordion, Button, Form} from "react-bootstrap";

const Turmas = () => {
    const token = localStorage.getItem("token-edux");
    const role = jwt_decode(token).role;

    const [turmas, setTurmas] = useState([]);
    const [descricao, setDescricao] = useState("");
    const [idCurso, setIdCurso] = useState("");
    const [alunos, setAlunos] = useState([]);
    const [professores, setProfessores] = useState([]);
    const [cursos, setCursos] = useState([]);

    let idPerfilProfessor = "8853b7d3-eba9-4ac4-901b-72198ad559ac";
    let idPerfilAluno = "23c9a335-3e15-4173-8987-8b7e7fcec7a1";

    useEffect(() => {
        listarCursos();
        listarUsuarios();
    }, [])

    const renderizarJumbotron = () => {
        if(role==="Professor") {
            return (
                <Titulo titulo="Turmas" chamada="Gerencie suas turmas"/>
            )
        }
        else {
            return (
                <Titulo titulo="Turmas" chamada="Veja suas turmas"/>
            )
        }
    }

    const listarCursos = () => {
        fetch(url + "/curso", { 
            headers: {
                "authorization": "Bearer " + token
            }
        })
        .then(response => response.json())
        .then(dados => {
            setCursos(dados.data);
        })
        .catch(err => console.log(err))
    }

    const listarUsuarios = () => {
        fetch(url + "/usuario")
        .then(response => response.json())
        .then(dados => {
            let professores = dados.filter(dado => dado.idPerfil === idPerfilProfessor)
            let alunos = dados.filter(dado => dado.idPerfil === idPerfilAluno)
            
            setAlunos(alunos)
            setProfessores(professores);
            console.log(dados)
        })
        .catch(err => console.log(err))
    }

    const renderizarCadastro = () => {
        if(role==="Professor") {
            return (
                <Accordion>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <Button variant="link" style={{background: "#FFF", border: "solid 1.5px #007bff", borderRadius: "20px"}}>Nova turma</Button>
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Form>
                                    <Form.Group>
                                        <Form.Control as="textarea" rows={3} placeholder="Descrição"/>
                                        <Form.Control as="select" value={idCurso} onChange={event => setIdCurso(event.target.value)}>
                                            <option value={0}>Curso</option>
                                            {
                                                cursos.map((curso, index) => {
                                                    return (
                                                        <option key={index} value={curso.id}>{curso.titulo}</option>
                                                    )
                                                })
                                            }
                                        </Form.Control>
                                        <Form.Control as="select" value={alunos} multiple onChange={event => setAlunos(event.target.value)}>
                                            <option value={0}>Alunos</option>
                                            {
                                                alunos.map((aluno, index) => {
                                                    return (
                                                        <option key={index} value={aluno.id}>{aluno.nome}</option>
                                                    )
                                                })
                                            }
                                        </Form.Control>
                                    </Form.Group>
                                    <Button variant="primary" type="submit" style={{margin: "auto", display:"block", width: "100%"}}>Cadastrar</Button>
                                </Form>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            )
        }
    }

    return (
        <div>
            <Menu/>
            {renderizarJumbotron()}
            {renderizarCadastro()}
            <Rodape/>
        </div>
    )
}

export default Turmas;