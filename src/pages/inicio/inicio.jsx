import React from "react";
import { Carousel, Row, Jumbotron, Button } from "react-bootstrap";
import Menu from "../../components/menu/menu";
import Rodape from "../../components/rodape/rodape";
import Ranking from "../../components/ranking/ranking";


const Inicio = () => {
    document.title = "Início";
    const token = localStorage.getItem("token-edux");

    const renderizarInicio = () => {
        if(token===null) {
            return (
                <div>
                    <img style={{width : '100vw'}} src="https://revistamelhor.com.br/wp-content/uploads/2019/10/O-poder-da-educac%CC%A7a%CC%83o.png" 
                    alt="Banner educação"></img>

                    <Jumbotron className="text-center">
                        <h1>Quem somos?</h1> <br></br>
                        <p style={{width: "70vh", margin: "auto", textAlign: "justify-all"}}> Somos professores e alunos empenhados em cumprir com os nossos objetivos: Os dos professores, de ensinar; Os dos alunos, de aprender. Pensando nisso, essa plataforma foi desenvolvida para nos ajudar em nossa missão.</p><br></br>
                        <p><Button variant="primary" href="/login">Entrar</Button><Button variant="link" href="/cadastrar" style={{marginLeft: "10px"}}>Cadastrar-se</Button></p>
                    </Jumbotron>

                    <Carousel style={{width : '100vw'}}>
                        <Carousel.Item >
                            <Row >
                                <img 
                                    className="d-block w-50"
                                    src="https://garotodainformatica.com.br/wp-content/uploads/2020/03/thumb.png" 
                                    alt="First Slide"
                                /> 
                                <img 
                                    className="d-block w-50"
                                    src="https://garotodainformatica.com.br/wp-content/uploads/2020/03/thumb.png" 
                                    alt="First Slide"
                                /> 
                            </Row>
                        </Carousel.Item>
                        <Carousel.Item >
                            <Row >
                                <img 
                                    className="d-block w-50"
                                    src="https://www.insper.edu.br/wp-content/uploads/2018/11/destaque-panoorama-educacao-2.png" 
                                    alt="First Slide"
                                /> 
                                <img 
                                    className="d-block w-50"
                                    src="https://www.cidadefx.com.br/files/2020/04/ferramentas-mudam-educacao.jpg" 
                                    alt="First Slide"
                                /> 
                            </Row>
                        </Carousel.Item>
                        <Carousel.Item >
                            <Row >
                                <img 
                                    className="d-block w-50"
                                    src="https://cdn.falauniversidades.com.br/wp-content/uploads/2020/04/02122231/ead-1.jpg" 
                                    alt="First Slide"
                                /> 
                                <img 

                                    className="d-block w-50"
                                    src="https://cdn.falauniversidades.com.br/wp-content/uploads/2020/04/02122231/ead-1.jpg" 
                                    alt="First Slide"
                                /> 
                            </Row>
                        </Carousel.Item>
                    </Carousel>
                </div>
            )
        }
        else {
            return (
                <Ranking></Ranking>
            )
        }
    }

    return ( 
        <div>
            <Menu/>  
            {renderizarInicio()}
            <Rodape/>
        </div>
    )
}

export default Inicio;