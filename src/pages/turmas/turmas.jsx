import React, {useState, useEffect} from "react";
import Rodape from "../../components/rodape/rodape";
import Menu from "../../components/menu/menu";
import Titulo from "../../components/titulo/index";
import jwt_decode from "jwt-decode";
import {url} from "../../utils/constants";
import {Card, Accordion, Button, Form, Row, Col} from "react-bootstrap";

const Turmas = () => {
    const token = localStorage.getItem("token-edux");
    const role = jwt_decode(token).role;

    const [id, setId] = useState("");
    const [descricao, setDescricao] = useState("");
    const [idCurso, setIdCurso] = useState("");
    const [alunos, setAlunos] = useState([]);
    const [alunosEscolhidos, setAlunosEscolhidos] = useState([]);
    const [professoresEscolhidos, setProfessoresEscolhidos] = useState([]);
    const [professores, setProfessores] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [turmas, setTurmas] = useState([]);

    let idPerfilProfessor = "8853b7d3-eba9-4ac4-901b-72198ad559ac";
    let idPerfilAluno = "23c9a335-3e15-4173-8987-8b7e7fcec7a1";

    const limparCampos = () => {
        setId("");
        setDescricao("");
        setIdCurso("");
        setAlunosEscolhidos([]);
        setProfessoresEscolhidos([]);
    }

    useEffect(() => {
        listarCursos();
        listarUsuarios();
        listar();
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

    const listar = () => {
        fetch(url+"/turma")
        .then(response => response.json())
        .then(dados => {
            setTurmas(dados);
            console.log(turmas)
            limparCampos();
        })
        .catch(err => console.log(err));
    }

    const cadastrar = (event) => {
        event.preventDefault();

        let professoresAlunosTurma = {
            professores: professoresEscolhidos,
            alunos: alunosEscolhidos,
            turma: {
                descricao: descricao,
                idCurso: idCurso
            }
        }

        let metodo = (id === "" ? "POST" : "PUT");
        let urlPostOuPut = (id === "" ? `${url}/turma` : `${url}/turma/${id}`);
    
        fetch(urlPostOuPut, {
            method: metodo,
            body: JSON.stringify(professoresAlunosTurma),
            headers: {
                "content-type": "application/json",
                "authorization": "Bearer " + token
            } 
        })
        .then(response => response.json())
        .then(response => {
            listar();
        })
        .catch(err => console.log(err));
    }

    const escolherAluno = (idAluno) => {
        fetch(`${url}/usuario/buscar/id/${idAluno}`)
        .then(response => response.json())
        .then(aluno => {
            setAlunosEscolhidos([
                ...alunosEscolhidos,
                aluno
            ]);
        })
        .catch(err => console.log(err));
    }

    const escolherProfessor = (idProfessor) => {
        fetch(`${url}/usuario/buscar/id/${idProfessor}`)
        .then(response => response.json())
        .then(professor => {
            setProfessoresEscolhidos([
                ...professoresEscolhidos,
                professor
            ]);
        })
        .catch(err => console.log(err));
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
        })
        .catch(err => console.log(err))
    }

    const removerAlunoEscolhido = (idAluno) => {
        fetch(`${url}/usuario/buscar/id/${idAluno}`)
        .then(response => response.json())
        .then(aluno => {
            let indice;
            alunosEscolhidos.forEach(alunoEscolhido => {
                if(aluno.email === alunoEscolhido.email) 
                    indice = alunosEscolhidos.indexOf(alunoEscolhido);
            })
            alunosEscolhidos.splice(indice,1);
            setAlunosEscolhidos([
                ...alunosEscolhidos
            ]);
        });
    }

    const removerProfessorEscolhido = (idProfessor) => {
        fetch(`${url}/usuario/buscar/id/${idProfessor}`)
        .then(response => response.json())
        .then(professor => {
            let indice;
            professoresEscolhidos.forEach(professorEscolhido => {
                if(professor.email === professorEscolhido.email) 
                    indice = professoresEscolhidos.indexOf(professorEscolhido);
            })
            professoresEscolhidos.splice(indice,1);
            setProfessoresEscolhidos([
                ...professoresEscolhidos
            ]);
        });
    }

    const renderizarTurmas = () => {
        if(role==="Professor") {
            return (
                <Card>
                    <Card.Body>
                        {
                            turmas.map((turma, index) => {
                                return (
                                    <div>
                                        <Card.Title>{turma.descricao}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                                        <Card.Text>
                                            Some quick example text to build on the card title and make up the bulk of
                                            the card's content.
                                        </Card.Text>
                                        <Card.Link href="#">Card Link</Card.Link>
                                        <Card.Link href="#">Another Link</Card.Link>
                                    </div>
                                )
                            })
                        }
                    </Card.Body>
                </Card>
            )
        }
    }

    const renderizarCadastro = () => {
        if(role==="Professor") {
            return (
                <Accordion style={{width: "90vw", margin: "auto"}}>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="primary" eventKey="0" style={{margin: "auto", display: "block"}}>Nova turma</Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Form onSubmit={event => cadastrar(event)}>
                                    <Form.Group>
                                        <h2 style={{lineHeight: "300%", textAlign: "center"}}>Configurações gerais da turma</h2>
                                        <Form.Control as="textarea" rows={3} placeholder="Descrição" value={descricao} onChange={event=>setDescricao(event.target.value)}/>
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
                                    </Form.Group>
                                    <Form.Group>
                                        <h2 style={{lineHeight: "300%", textAlign: "center"}}>Escolha os integrantes da turma</h2>
                                        <Form.Label style={{fontWeight: "bolder"}}>Os alunos:</Form.Label>
                                        <Form.Control as="select" onChange={event => escolherAluno(event.target.value)} style={{marginBottom: "20px"}}>
                                            <option>Alunos</option>
                                            {
                                                alunos.map((aluno, index) => {
                                                    return (
                                                        <option key={index} value={aluno.id}>{aluno.nome}</option>
                                                    )
                                                })
                                            }
                                        </Form.Control>
                                        <div style={{height: "auto", borderRadius: "25px", borderTop: "solid 1.5px #00d65f", borderRight: "solid 1.5px #ff271c", borderBottom: "solid 1.5px #f9e800", borderLeft: "solid 1.5px #00c2ee"}}>
                                            <Row>
                                                {
                                                    alunosEscolhidos.map((aluno, index) => {
                                                        return (
                                                            <Col xs="2">
                                                                <Button onClick={event=>removerAlunoEscolhido(event.target.value)} style={{margin: "20px"}} key={index} value={aluno.id}>X {aluno.nome}</Button>
                                                            </Col>
                                                        )
                                                    })
                                                }
                                            </Row>
                                        </div>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label style={{fontWeight: "bolder"}}>Os professores:</Form.Label>
                                        <Form.Control as="select" onChange={event => escolherProfessor(event.target.value)} style={{marginBottom: "20px"}}>
                                            <option>Professores</option>
                                            {
                                                professores.map((professor, index) => {
                                                    return (
                                                        <option key={index} value={professor.id}>{professor.nome}</option>
                                                    )
                                                })
                                            }
                                        </Form.Control>
                                        <div style={{height: "auto", borderRadius: "25px", borderTop: "solid 1.5px #00d65f", borderRight: "solid 1.5px #ff271c", borderBottom: "solid 1.5px #f9e800", borderLeft: "solid 1.5px #00c2ee"}}>
                                            <Row>
                                                {
                                                    professoresEscolhidos.map((professor, index) => {
                                                        return (
                                                            <Col xs="2">
                                                                <Button onClick={event=>removerProfessorEscolhido(event.target.value)} style={{margin: "20px"}} key={index} value={professor.id}>X {professor.nome}</Button>
                                                            </Col>
                                                        )
                                                    })
                                                }
                                            </Row>
                                        </div>
                                    </Form.Group>
                                    <Button variant="primary" type="submit" style={{margin: "auto", display:"block", width: "100px"}}>Cadastrar</Button>
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
            {renderizarTurmas()}
            <Rodape/>
        </div>
    )
}

export default Turmas;