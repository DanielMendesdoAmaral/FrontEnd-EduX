import React, {useState, useEffect} from "react";
import Rodape from "../../components/rodape/rodape";
import Menu from "../../components/menu/menu";
import Titulo from "../../components/titulo/index";
import jwt_decode from "jwt-decode";
import {url} from "../../utils/constants";
import {Card, Accordion, Button, Form, Row, Col, Container} from "react-bootstrap";

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
        fetch(`${url}/turma`)
        .then(response => response.json())
        .then(dados => {
            setTurmas(dados.data);
            limparCampos();
        })
        .catch(err => console.log(err));
    }

    const cadastrar = (event) => {
        event.preventDefault();

        let professoresTurma = [];

        for(let c=0; c<professoresEscolhidos.length;c++) {
            professoresTurma[c] = new Object();
            professoresTurma[c].descricao = "Professor";
            professoresTurma[c].idUsuario = professoresEscolhidos[c].id;
        }

        let alunosTurma = [];

        for(let c=0; c<alunosEscolhidos.length;c++) {
            alunosTurma[c] = new Object();
            alunosTurma[c].matricula = "";
            alunosTurma[c].idUsuario = alunosEscolhidos[c].id;
        }

        let turma = {
            descricao: descricao,
            idCurso: idCurso
        }

        let professoresAlunosTurma = {
            professores: professoresTurma,
            alunos: alunosTurma,
            turma: turma
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
        .then(response => listar())
        .then(dados => listar())
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

    const remover = (event) => {
        event.preventDefault();

        fetch(url + "/turma/" + event.target.value, { 
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "authorization": "Bearer " + token
            }
        })
        .then(response => listar())
        .then(response => listar())
        .catch(err => console.log(err));
    }

    const renderizarTurmas = () => {
        if(turmas.length<1) {
            return (
                <Container style={{margin: "50px", textAlign: "center"}}>
                    <p>Desculpe! No momento você não está participando de nenhuma turma!</p>
                </Container>
            )
        }
        if(role==="Professor") {
            return (
                <Container>
                    <Row style={{marginTop: "50px"}}>
                        {
                            turmas.map((turma, index) => {
                                return (
                                    <Col key={index} xs={4}>
                                        <Card style={{margin: "25px"}}>
                                            <Card.Body>
                                                <Card.Title>{turma.descricao}</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">{turma.curso.titulo}</Card.Subtitle>
                                                <Card.Text>
                                                    Esta turma tem {turma.professoresTurmas.length} professores e {turma.alunosTurmas.length} alunos.
                                                </Card.Text>
                                                <div style={{display: "flex", justifyContent: "space-around"}}>
                                                    <Button variant="link">Ver +</Button>
                                                    <Button>Editar</Button>
                                                    <Button variant="danger" onClick={event=>remover(event)} value={turma.id}>Deletar</Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Container>
            )
        }
        else {
            return (
                <Container>
                    <Row style={{marginTop: "50px"}}>
                        {
                            turmas.map((turma, index) => {
                                return (
                                    <Col key={index} xs={4}>
                                        <Card style={{margin: "25px"}}>
                                            <Card.Body>
                                                <Card.Title>{turma.descricao}</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">{turma.curso.titulo}</Card.Subtitle>
                                                <Card.Text>
                                                    Esta turma tem {turma.professoresTurmas.length} professores e {turma.alunosTurmas.length} alunos.
                                                </Card.Text>
                                                <div style={{display: "flex", justifyContent: "space-around"}}>
                                                    <Button variant="link">Ver +</Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Container>
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
                                            <option value={0} selected>Curso</option>
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
                                            <option selected>Alunos</option>
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
                                                            <Col xs="2" key={index}>
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
                                            <option selected>Professores</option>
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
                                                            <Col xs="2" key={index}>
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