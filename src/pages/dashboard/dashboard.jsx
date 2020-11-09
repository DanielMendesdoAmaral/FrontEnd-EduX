import React, {useEffect, useState} from "react";
import Menu from "../../components/menu/menu";
import Rodape from "../../components/rodape/rodape";
import {url} from "../../utils/constants";
import Titulo from "../../components/titulo";
import {Container, Row, Col} from "react-bootstrap";

const Dashboard = () => {
    const [qtdUsuarios, setQtdUsuarios] = useState(0);
    const [qtdTurmas, setQtdTurmas] = useState(0);
    const [qtdDicas, setQtdDicas] = useState(0);
    const [qtdObjetivos, setQtdObjetivos] = useState(0);

    useEffect(() => {
        listar();
    }, [])

    const listar = () => {
        fetch(`${url}/usuario`)
        .then(response => response.json())
        .then(dados => {
            setQtdUsuarios(dados.length);
        })
        .catch(err => console.log(err));

        fetch(`${url}/turma`)
        .then(response=>response.json())
        .then(dados => {
            setQtdTurmas(dados.length)
        })
        .catch(err => console.log(err));

        fetch(`${url}/dica`)
        .then(response => response.json())
        .then(dados => {
            setQtdDicas(dados.totalCount)
        })
        .catch(err => console.log(err));

        fetch(`${url}/objetivo`)
        .then(response=>response.json())
        .then(dados => {
            setQtdObjetivos(dados.length);
        })
        .catch(err=>console.log(err));
    }

    return (
        <>
            <Menu/>
            <Titulo titulo="Dashboard" chamada="Tenha uma visão geral da plataforma"/>
            <Container style={{margin: "50px auto"}}>
                <Row style={{textAlign: "center", lineHeight: "100px"}}>
                    <Col xs={4}>
                        <div style={{borderRight: "solid 1px black", height: "150px"}}>
                            <h5>Quantidade de usuários: </h5>
                            <p>{qtdUsuarios}</p>
                        </div>
                    </Col>
                    <Col xs={4}>
                        <div style={{borderRight: "solid 1px black", height: "150px"}}>
                            <h5>Quantidade de turmas: </h5>
                            <p>{qtdTurmas}</p>
                        </div>
                    </Col>
                    <Col xs={4}>
                        <div>
                            <h5>Quantidade de posts: </h5>
                            <p>{qtdDicas}</p>
                        </div>
                    </Col>
                    <Col xs={4}>
                        <div style={{borderRight: "solid 1px black", height: "150px", marginTop: "35px"}}>
                            <h5>Quantidade de objetivos: </h5>
                            <p>{qtdObjetivos}</p>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Rodape/>
        </>
    )
}

export default Dashboard;