import React, {useState, useEffect} from "react";
import Menu from "../../components/menu/menu";
import Rodape from "../../components/rodape/rodape";
import {Form, Accordion, Card, Button, Col, Row, Tabs, Tab, Container} from "react-bootstrap";
import jwt_decode from "jwt-decode";
import {url} from "../../utils/constants";


const ObjetivosTurma = () => {
    document.title = "Objetivos da turma";
    let idTurma = window.location.href.substr(38);
    const token = localStorage.getItem("token-edux");
    const role = jwt_decode(token).role;

    //objetivos
    const [idObj, setIdObj] = useState("");
    const [descricao, setDescricao] = useState("");
    const [idCategoria, setIdCategoria] = useState("");
    
    //objAluno
    const [idObjetivo, setIdObjetivo] = useState("");
    const [nota, setNota] = useState(0);
    const [dataAlcancado, setDataAlcancado] = useState("");

    const [objetivosAlunos, setObjetivosAlunos] = useState([])
    const [categorias, setCategorias] = useState([]);
    const [alunos, setAlunos] = useState([]);
    const [alunosEscolhidos, setAlunosEscolhidos] = useState([]);
    const [idCategoriaEscolhida, setIdCategoriaEscolhida] = useState("");
    const [objetivos, setObjetivos] = useState([]);

    useEffect(() => {
        listarCategorias();
        listarAlunos();
        listarObjetivosAlunos();
        listarObjetivos();
    }, []);

    const listarCategorias = () => {
        fetch(url + "/categoria")
        .then(response => response.json())
        .then(dados => {
            setCategorias(dados);
        })
        .catch(err => console.log(err))
    }

    const listarAlunos = () => {
        fetch(url + "/turma")
        .then(response => response.json())
        .then(dados => {
            let turma = dados.filter(dado => dado.id === idTurma);
            let listaAlunos = turma[0].alunosTurmas;
            setAlunos(listaAlunos);
        })
        .catch(err => console.log(err))
    }

    const removerAlunoEscolhido = (idAluno) => {
        fetch(url + "/turma")
        .then(response => response.json())
        .then(dados => {
            let turma = dados.filter(dado => dado.id === idTurma);
            let todosAlunosDaTurma = turma[0].alunosTurmas;
            let alunoEscolhido = todosAlunosDaTurma.filter(aluno => aluno.id === idAluno)[0]
            let indice;
            alunosEscolhidos.forEach(alunoRemover => {
                if(alunoRemover.id === alunoEscolhido.id) 
                    indice = alunosEscolhidos.indexOf(alunoRemover);
            })
            alunosEscolhidos.splice(indice,1);
            setAlunosEscolhidos([
                ...alunosEscolhidos
            ]);
        })
        .catch(err => console.log(err))
    }

    const escolherAluno = (idAluno) => {
        fetch(url + "/turma")
        .then(response => response.json())
        .then(dados => {
            let turma = dados.filter(dado => dado.id === idTurma);
            let todosAlunosDaTurma = turma[0].alunosTurmas;
            let alunoEscolhido = todosAlunosDaTurma.filter(aluno => aluno.id === idAluno)[0]
            setAlunosEscolhidos([
                ...alunosEscolhidos,
                alunoEscolhido
            ])
        })
        .catch(err => console.log(err))
    }

    const cadastrar = (event) => {
        event.preventDefault();

        //OBJETIVO

        let metodoObj = (idObj === "" ? "POST" : "PUT");
        let urlPostOuPutObj = (idObj === "" ? `${url}/objetivo` : `${url}/objetivo/${idObj}`);

        let objetivo = {
            descricao: descricao,
            idCategoria: idCategoria
        }

        fetch(urlPostOuPutObj, {
            method: metodoObj,
            body: JSON.stringify(objetivo),
            headers: {
                "content-type": "application/json",
                "authorization": "Bearer " + token 
            } 
        })
        .then(response => response.json())
        .then(dado => {
            console.log("CADASTROU: " + dado.id);
            setIdObjetivo(dado.id);
            listarObjetivos();
            listarObjetivosAlunos();
            console.log("ARMAZENOU: " + idObjetivo)
        })
        .catch(err => console.log(err));

        //OBJETIVO ALUNO

        if(metodoObj==="POST") {
            console.log("CADASTRAR OBJETIVOSALUNOS: " + idObjetivo);

            alunosEscolhidos.forEach(alunoEscolhido => {
            
                let objetivoAluno = {
                    nota: nota,
                    dataAlcancado: dataAlcancado,
                    idAlunoTurma: alunoEscolhido.id,
                    idObjetivo: idObjetivo
                }
    
                fetch(`${url}/objetivoaluno`, {
                    method: "POST",
                    body: JSON.stringify(objetivoAluno),
                    headers: {
                        "content-type": "application/json",
                        "authorization": "Bearer " + token 
                    } 
                })
                .then(response => response.json())
                .then(dados => {
                    listarObjetivos();
                    listarObjetivosAlunos();
                })
                .catch(err => console.log(err));
            })
        }
    }

    const renderizarCadastro = () => {
        if(role==="Professor") {
            return (
                <Accordion style={{width: "90vw", margin: "50px auto"}}>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="primary" eventKey="0" style={{margin: "auto", display: "block"}}>Novo objetivo</Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Form onSubmit={event => cadastrar(event)}>
                                    <Form.Group>
                                        <h2 style={{lineHeight: "300%", textAlign: "center"}}>Configurações gerais</h2>
                                        <Form.Control as="textarea" rows={3} placeholder="Descreva o objetivo" value={descricao} onChange={event=>setDescricao(event.target.value)}/>
                                        <Form.Control as="select" value={idCategoria} onChange={event => setIdCategoria(event.target.value)}>
                                            <option value={0} selected>Categoria</option>
                                            {
                                                categorias.map((categoria, index) => {
                                                    return (
                                                        <option key={index} value={categoria.id}>{categoria.tipo}</option>
                                                    )
                                                })
                                            }
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <h2 style={{lineHeight: "300%", textAlign: "center"}}>Escolha alunos para atribuir este objetivo</h2>
                                        <Form.Control as="select" onChange={event => escolherAluno(event.target.value)} style={{marginBottom: "20px"}}>
                                            <option selected>Alunos</option>
                                            {
                                                alunos.map((aluno, index) => {
                                                    return (
                                                        <option key={index} value={aluno.id}>{aluno.usuario.nome}</option>
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
                                                                <Button onClick={event=>removerAlunoEscolhido(event.target.value)} style={{margin: "20px"}} key={index} value={aluno.id}>X {aluno.usuario.nome}</Button>
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

    const listarObjetivosAlunos = () => {
        fetch(`${url}/objetivoaluno`)
        .then(response => response.json())
        .then(dados => {
            setObjetivosAlunos(dados);
        })
        .catch(err => console.log(err));
    }

    const listarObjetivos = () => {
        fetch(`${url}/objetivo`)
        .then(response => response.json())
        .then(dados => {
            setObjetivos(dados);
        })
        .catch(err => console.log(err));
    }

    const limparCampos = () => {
        setAlunosEscolhidos([]);
        setDataAlcancado("");
        setDescricao("");
        setIdCategoria("");
        setIdObj("");
        setIdObjetivo("");
        setNota(0);
        setDataAlcancado("");
    }

    const deletar = (id) => {
        fetch(`${url}/objetivo/${id}`, {
            method: "DELETE"
        })
        .then(response=>response.json())
        .then(dados => {
            listarObjetivos();
            listarObjetivosAlunos();
            limparCampos();
        })
        .catch(err => console.log(err))
    }

    const editar = (id) => {
        fetch(`${url}/objetivo/buscar/id/${id}`)
        .then(response => response.json())
        .then(obj => {
            setIdObj(obj.id)
            setDescricao(obj.descricao)
            setIdCategoria(obj.idCategoria);
        })
        .catch(err => console.log(err))
    }

    const editarObjAluno = (dadosObjAluno) => {
        let dados = dadosObjAluno.split("//");

        let objetivoAluno = {
            nota: nota,
            idObjetivo: dados[1],
            idAlunoTurma: dados[2],
            dataAlcancado: ""
        }

        fetch(`${url}/objetivoaluno/${dados[0]}`, {
            method: "PUT",
            body: JSON.stringify(objetivoAluno),
            headers: {
                "content-type": "application/json",
                "authorization": "Bearer " + token 
            } 
        })
        .then(response=> {
            listarObjetivos()
            listarObjetivosAlunos()
            limparCampos();
        })
        .catch(err=>console.log(err));
    }

    const deletarObjAluno = (id) => {
        fetch(`${url}/objetivoaluno/${id}`, {
            method: "DELETE",
            "content-type": "application/json",
            "authorization": "Bearer " + token 
        })
        .then(response=> {
            listarObjetivos()
            listarObjetivosAlunos()
            limparCampos();
        })
        .catch(err=>console.log(err));
    }

    const renderizarObjetivosTurmas = (id) => {
        if(role==="Professor") {
            return (
                <div>
                    {
                        objetivos.filter(objetivo => objetivo.idCategoria === id).map((objetivo, index) => {
                            return (
                                <Accordion key={index}>
                                    <Card>
                                        <Card.Header>
                                            <Accordion.Toggle eventKey="0" as={Button} variant="link" style={{display: "flex", margin: "auto", outline: "none"}}>
                                                {objetivo.descricao}
                                                <div>
                                                    <label htmlFor={index}><i className="fas fa-pencil-alt" style={{margin: "0 40px"}}></i></label>
                                                    <input type="button" id={index} value={objetivo.id} onClick={event => editar(event.target.value)} style={{display: "none"}}></input>
                                                    <label htmlFor={index+0.5}><i className="fas fa-trash-alt"></i></label>
                                                    <input type="button" id={index+0.5} value={objetivo.id} onClick={event => deletar(event.target.value)} style={{display: "none"}}></input>
                                                </div>
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        {
                                            objetivosAlunos.filter(objetivoAluno => objetivoAluno.idObjetivo === objetivo.id).map((objetivoAluno, index) => {
                                                if(objetivoAluno.nota===0) {
                                                    return (
                                                        <Accordion.Collapse eventKey="0" key={index}>
                                                            <Card.Body style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                                                                {objetivoAluno.alunoTurma.usuario.nome}
                                                                <span style={{color: "red", marginLeft: "20px"}}>Sem nota</span>
                                                                <div style={{display: "flex", alignItems: "center"}}>
                                                                    <input style={{borderRadius: "10px", borderTop: "solid 1.5px #00d65f", borderRight: "solid 1.5px #ff271c", borderBottom: "solid 1.5px #f9e800", borderLeft: "solid 1.5px #00c2ee", outline: "none"}} placeholder="0-100" onChange={event=>setNota(event.target.value)} type="number" min={0} max={100}/>
                                                                    <Button value={`${objetivoAluno.id}//${objetivoAluno.idObjetivo}//${objetivoAluno.idAlunoTurma}`} onClick={event=>editarObjAluno(event.target.value)} style={{padding: "1px 6px", marginLeft: "15px"}} variant="primary">Enviar</Button>
                                                                    <Button value={`${objetivoAluno.id}`} onClick={event=>deletarObjAluno(event.target.value)} style={{padding: "1px 6px", marginLeft: "5px", color: "red"}} variant="link">Deletar</Button>
                                                                </div>
                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <Accordion.Collapse eventKey="0" key={index}>
                                                            <Card.Body style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                                                                {objetivoAluno.alunoTurma.usuario.nome}
                                                                <div>
                                                                    Nota: {objetivoAluno.nota}pts<br></br>
                                                                    Data conclusão: {`${objetivoAluno.dataAlcancado.substring(8,10)}/${objetivoAluno.dataAlcancado.substring(5,7)}/${objetivoAluno.dataAlcancado.substring(0,4)}`}<br></br>
                                                                    Hora conclusão: {`${objetivoAluno.dataAlcancado.substring(11,16)}`}
                                                                </div>
                                                                <div style={{display: "flex", alignItems: "center"}}>
                                                                    <input style={{borderRadius: "10px", borderTop: "solid 1.5px #00d65f", borderRight: "solid 1.5px #ff271c", borderBottom: "solid 1.5px #f9e800", borderLeft: "solid 1.5px #00c2ee", outline: "none"}} placeholder="0-100" onChange={event=>setNota(event.target.value)} type="number" min={0} max={100}/>
                                                                    <Button value={`${objetivoAluno.id}//${objetivoAluno.idObjetivo}//${objetivoAluno.idAlunoTurma}`} onClick={event=>editarObjAluno(event.target.value)} style={{padding: "1px 6px", marginLeft: "15px"}} variant="primary">Enviar</Button>
                                                                    <Button value={`${objetivoAluno.id}`} onClick={event=>deletarObjAluno(event.target.value)} style={{padding: "1px 6px", marginLeft: "5px", color: "red"}} variant="link">Deletar</Button>
                                                                </div>
                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                    )
                                                }
                                            })
                                        }
                                    </Card>
                                </Accordion>
                            )
                        })
                    }
                </div>
            )
        }
        else if(role==="Aluno") {
            return (
                <div>
                    {
                        objetivos.filter(objetivo => objetivo.idCategoria === id && objetivo.idCategoria!=="32998fb1-1956-46a6-813e-14bbbaadd97b").map((objetivo, index) => {
                            return (
                                <Accordion key={index}>
                                    <Card>
                                        <Card.Header>
                                            <Accordion.Toggle eventKey="0" as={Button} variant="link" style={{display: "flex", margin: "auto", outline: "none"}}>
                                                {objetivo.descricao}
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        {
                                            objetivosAlunos.filter(objetivoAluno => objetivoAluno.idObjetivo === objetivo.id && objetivoAluno.alunoTurma.idUsuario===jwt_decode(token).id).map((objetivoAluno, index) => {
                                                if(objetivoAluno.nota===0) {
                                                    return (
                                                        <Accordion.Collapse eventKey="0" key={index}>
                                                            <Card.Body style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                                                                {objetivoAluno.alunoTurma.usuario.nome}
                                                                <span style={{color: "red", marginLeft: "20px"}}>Sem nota</span>
                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <Accordion.Collapse eventKey="0" key={index}>
                                                            <Card.Body style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                                                                {objetivoAluno.alunoTurma.usuario.nome}
                                                                <div>
                                                                    Nota: {objetivoAluno.nota}pts<br></br>
                                                                    Data conclusão: {`${objetivoAluno.dataAlcancado.substring(8,10)}/${objetivoAluno.dataAlcancado.substring(5,7)}/${objetivoAluno.dataAlcancado.substring(0,4)}`}<br></br>
                                                                    Hora conclusão: {`${objetivoAluno.dataAlcancado.substring(11,16)}`}
                                                                </div>
                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                    )
                                                }
                                            })
                                        }
                                    </Card>
                                </Accordion>
                            )
                        })
                    }
                </div>
            )
        }
    }

    const renderizarMain = () => {
        return (
            <Container style={{margin: "75px auto"}}>
                <Tabs defaultActiveKey="gerenciar" id="uncontrolled-tab-example" style={{display: "flex", justifyContent: "center"}}>
                    <Tab eventKey="gerenciar" title="Gerenciar objetivos">
                        <Form.Group style={{width: "80%", margin: "50px auto"}}>
                            <p>Escolha uma categoria para filtrar os resultados: </p>
                            <Form.Control as="select" value={idCategoriaEscolhida} onChange={event => setIdCategoriaEscolhida(event.target.value)}>
                                <option value={0} selected>Categoria</option>
                                {
                                    categorias.map((categoria, index) => {
                                        return (
                                            <option key={index} value={categoria.id}>{categoria.tipo}</option>
                                        )
                                    })
                                }
                            </Form.Control>
                        </Form.Group>
                        {renderizarObjetivosTurmas(idCategoriaEscolhida)}
                    </Tab>
                </Tabs>
            </Container>
        )
    }

    return (
        <>
            <Menu/>
            {renderizarCadastro()}
            {renderizarMain()}
            <Rodape/>
        </>
    )
}

export default ObjetivosTurma;