import React, { useEffect, useState } from "react";
import {url} from "../../utils/constants";
import Menu from "../../components/menu/menu";
import Rodape from "../../components/rodape/rodape";
import {Container, ListGroup} from "react-bootstrap";


const DetalhesTurma = () => {
    document.title = "Detalhes da turma";
    let id = window.location.href.substr(37);
    const [turma, setTurma] = useState([]);

    useEffect(() => {
        listarTurma();
    }, [])

    const listarTurma = () => {
        fetch(`${url}/turma`)
        .then(response => response.json())
        .then(dados => {
            let turmas = dados;
            turmas = dados.filter(dado => dado.id===id);
            setTurma(turmas);
        })
        .catch(err => console.log(err));
    }

    return (
        <div>
            <Menu/>
            <Container style={{marginBottom: "50px"}}>
                {
                    turma.map((turma, index) => {
                        return (
                            <>
                                <h1 style={{textAlign: "center", lineHeight: "300%"}}>{turma.descricao} - {turma.curso.titulo}</h1>
                            </>
                        )
                    })
                }
                <h5 style={{margin: "50px 0"}}>Integrantes da turma -em ordem alfabética-</h5>
                <p>Professores</p>
                <ListGroup>
                {
                    turma.map((turma, index) => {
                        return (
                            <>
                                <ListGroup.Item>
                                    {
                                        turma.professoresTurmas.sort(function (a, b) {
                                            return (a.usuario.nome > b.usuario.nome) ? 1 : ((b.usuario.nome > a.usuario.nome) ? -1 : 0);
                                        })
                                        .map((professor => {
                                            return (
                                                <p>{professor.usuario.nome}</p>
                                            )
                                        }))
                                    }
                                </ListGroup.Item>
                                
                            </>
                        )
                    })
                }
                </ListGroup>
                <p style={{margin: "20px 0"}}>Alunos</p>
                <ListGroup>
                {
                    turma.map((turma, index) => {
                        return (
                            <>
                                <ListGroup.Item>
                                    {
                                        turma.alunosTurmas.sort(function (a, b) {
                                            return (a.usuario.nome > b.usuario.nome) ? 1 : ((b.usuario.nome > a.usuario.nome) ? -1 : 0);
                                        })
                                        .map((aluno => {
                                            return (
                                                <p>{aluno.usuario.nome}</p>
                                            )
                                        }))
                                    }
                                </ListGroup.Item>
                            </>
                        )
                    })
                }
                </ListGroup>
            </Container>
            <Rodape/>
        </div>
    )
}

export default DetalhesTurma;