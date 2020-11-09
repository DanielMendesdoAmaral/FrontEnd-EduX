import React, {useEffect, useState} from 'react';
import { ProgressBar, Jumbotron } from 'react-bootstrap';
import Menu from '../../components/menu/menu';
import Rodape from '../../components/rodape/rodape';
import {url} from "../../utils/constants";

const Perfil = () => {
    let critico = "6a658a5a-d30e-4d81-904b-bd345d805989";
    let desejavel = "ede0aec0-9c16-4d5f-bf8a-d0d37c911838";
    let oculto = "32998fb1-1956-46a6-813e-14bbbaadd97b";

    let qtdCritico=0;
    let qtdDesejavel=0;
    let qtdOculto=0;

    let totalObjetivos=0;

    let porcentagemCritico=0;
    let porcentagemDesejavel=0;
    let porcentagemOculto=0;
    
    let idUsuario = window.location.href.substr(37, 36);
    let posicaoRankingUsuario = window.location.href.substring(73, 74);
    let posicao = window.location.href.substring(window.location.href.indexOf("&")+1, window.location.href.lastIndexOf("&"));
    let pontuacao = window.location.href.substring(window.location.href.lastIndexOf("&")+1);

    const [usuario, setUsuario] = useState([]);

    useEffect(() => {
        fetch(`${url}/usuario`)
        .then(response => response.json())
        .then(dados => {
            setUsuario(dados.filter(dado=>dado.id===idUsuario));
        })
        .catch(err=>console.log(err));
    }, []);
    
    return (
        <>
            <Menu/>
            {
                usuario.map((usuario, index) => {
                    return (
                        <Jumbotron style={{display: "flex", justifyContent: "space-around"}}>
                            <div>
                                {posicaoRankingUsuario==="g"&&<div style={{width: "100px", height: "100px", borderRadius: "100%", background: "#f7bc14", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "50px", boxShadow: "0px 0px 30px #f7bc14"}}>{usuario.nome.substring(0,1).toUpperCase()}</div>}
                                {posicaoRankingUsuario==="s"&&<div style={{width: "100px", height: "100px", borderRadius: "100%", background: "#777", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "50px", boxShadow: "0px 0px 30px #777"}}>{usuario.nome.substring(0,1).toUpperCase()}</div>}
                                {posicaoRankingUsuario==="b"&&<div style={{width: "100px", height: "100px", borderRadius: "100%", background: "#A46940", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "50px", boxShadow: "0px 0px 30px #A46940"}}>{usuario.nome.substring(0,1).toUpperCase()}</div>}
                                {posicaoRankingUsuario==="n"&&<div style={{width: "100px", height: "100px", borderRadius: "100%", background: "#dedede", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "50px"}}>{usuario.nome.substring(0,1).toUpperCase()}</div>}

                                {posicaoRankingUsuario==="g"&&<div style={{display: "flex", alignItems: "center", flexDirection: "column"}}><h1 style={{margin: "25px 0"}}>{usuario.nome}</h1><p>#1 <i style={{color: "#f7bc14"}} class="fas fa-trophy"></i></p><p>{pontuacao}pts</p></div>}
                                {posicaoRankingUsuario==="s"&&<div style={{display: "flex", alignItems: "center", flexDirection: "column"}}><h1 style={{margin: "25px 0"}}>{usuario.nome}</h1><p>#2 <i style={{color: "#777"}} class="fas fa-trophy"></i></p><p>{pontuacao}pts</p></div>}
                                {posicaoRankingUsuario==="b"&&<div style={{display: "flex", alignItems: "center", flexDirection: "column"}}><h1 style={{margin: "25px 0"}}>{usuario.nome}</h1><p>#3 <i style={{color: "#A46940"}} class="fas fa-trophy"></i></p><p>{pontuacao}pts</p></div>}
                                {posicaoRankingUsuario==="n"&&<div style={{display: "flex", alignItems: "center", flexDirection: "column"}}><h1 style={{margin: "25px 0"}}>{usuario.nome}</h1><p>#{posicao} <i style={{color: "#dedede"}} class="fas fa-trophy"></i></p><p>{pontuacao}pts</p></div>}
                            </div>
                            {
                                usuario.alunosTurmas.map((alunoTurma, index) => {
                                    alunoTurma.objetivosAlunos.map(objetivoAluno => {
                                        if(objetivoAluno.objetivo.idCategoria===critico)
                                            qtdCritico++;
                                        if(objetivoAluno.objetivo.idCategoria===desejavel)
                                            qtdDesejavel++;
                                        if(objetivoAluno.objetivo.idCategoria===oculto)
                                            qtdOculto++;
                                    })

                                    totalObjetivos = qtdCritico+qtdDesejavel+qtdOculto;

                                    porcentagemCritico = qtdCritico*100/totalObjetivos;
                                    porcentagemDesejavel = qtdDesejavel*100/totalObjetivos;
                                    porcentagemOculto = qtdOculto*100/totalObjetivos;

                                })
                            }
                            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                <>
                                    <p style={{fontWeight: "bolder"}}>Legenda</p>
                                    <div style={{display: "flex"}}><div style={{background: "#DC3545", marginRight: "10px", width: "20px", height: "20px", borderRadius: "5px"}}></div><p>Objetivos críticos: {`${qtdCritico} (${porcentagemCritico.toFixed(2)}%)`}</p></div>
                                    <div style={{display: "flex"}}><div style={{background: "#FFC107", marginRight: "10px", width: "20px", height: "20px", borderRadius: "5px"}}></div><p>Objetivos desejáveis: {`${qtdDesejavel} (${porcentagemDesejavel.toFixed(2)}%)`}</p></div>
                                    <div style={{display: "flex"}}><div style={{background: "#28A745", marginRight: "10px", width: "20px", height: "20px", borderRadius: "5px"}}></div><p>Objetivos ocultos: {`${qtdOculto} (${porcentagemOculto.toFixed(2)}%)`}</p></div>
                                    <p style={{fontWeight: "bolder"}}>Total de objetivos: {`${totalObjetivos}`}</p>
                                </>
                                <ProgressBar style={{width: "500px"}}>
                                    <ProgressBar animated striped variant="danger" now={porcentagemCritico} key={1} />
                                    <ProgressBar animated striped variant="warning" now={porcentagemDesejavel} key={2} />
                                    <ProgressBar animated striped variant="success" now={porcentagemOculto} key={3} />
                                </ProgressBar>
                            </div>
                        </Jumbotron>
                    )
                })
            }
            <Rodape/>
        </>
    )
}
export default Perfil;