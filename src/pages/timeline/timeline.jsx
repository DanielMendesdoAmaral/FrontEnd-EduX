import React, {useState, useEffect} from 'react';
import Menu from "../../components/menu/menu";
import Rodape from "../../components/rodape/rodape";
import {Card, Form, Button, Container, FormFile} from 'react-bootstrap';
import {url} from "../../utils/constants";
import jwt_decode from "jwt-decode";

 
const TimeLine = () => {
    document.title = "Dicas";

    const [dicas, setDicas] = useState([]);

    const token = localStorage.getItem("token-edux");
    const idUsuario = jwt_decode(token).id;

    const [descricao, setDescricao] = useState("");
    const [urlImagem, setUrlImagem] = useState("");
    const [id, setId] = useState("");

    useEffect(() => {
        listar();
    }, [])

    const upload = (event) => {
        event.preventDefault();

        let formData = new FormData();
        formData.append("arquivo", event.target.files[0]);

        fetch(`${url}/upload`, {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            setUrlImagem(data.url);
        })
        .catch(err => console.log(err));
    }

    const salvar = (event) => {
        event.preventDefault();

        let dica = {
            texto: descricao,
            urlImagem: urlImagem,
            idUsuario: idUsuario
        }

        let metodo = (id === "" ? "POST" : "PUT");
        let urlPostOuPut = (id === "" ? `${url}/dica` : `${url}/dica/${id}`);
    
        fetch(urlPostOuPut, {
            method: metodo,
            body: JSON.stringify(dica),
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

    const listar = () => {
        fetch(`${url}/dica`)
        .then(response => response.json())
        .then(dados => {
            setDicas(dados.data);
            limparCampos();
        })
        .catch(err => console.log(err));
    }

    const limparCampos = () => {
        setDescricao("");
        setId("");
        setUrlImagem("");
    }

    const deletar = (id) => {
        fetch(`${url}/dica/${id}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(dados => {
            listar();
        })
        .catch(err => console.log(err));
    }

    const editar = (id) => {
        fetch(`${url}/dica/buscar/id/${id}`)
        .then(response => response.json())
        .then(dado => {
            setId(dado.id);
            setDescricao(dado.texto);
            setUrlImagem(dado.urlImagem);
        })
        .catch(err => console.log(err));
    }

    return(
        <div>
            <Menu/>
            <Container style={{margin: "50px auto"}}>
                <Form style={{margin : '60px, 0', width: "90vw"}} onSubmit={event=>salvar(event)}>
                    <div style={{display: "flex"}}>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Control style={{border : '2px solid #007bff', borderRadius : '15px', width: "50vw", height: "90px"}} as="textarea" placeholder="O que você está pensando" rows={3} value={descricao} onChange={event=>setDescricao(event.target.value)} required/>
                        </Form.Group>
                            <FormFile style={{display: "flex"}}>
                                <Form.Label htmlFor="fileDica"><i className="fas fa-paperclip" style={{color: "gray", fontSize: "30px", marginLeft: "15px"}}></i></Form.Label>
                                <Form.File 
                                    id="fileDica"
                                    label="Imagem da categoria"
                                    custom
                                    onChange={event => upload(event)}
                                    style={{display: "none"}}
                                />
                                {urlImagem && <div style={{height: "90px", width: "auto", minWidth: "90px", marginLeft: "20px", borderRadius: "15px", border : '2px solid #007bff', background: `url(${urlImagem})`, backgroundSize: "cover"}}></div>}
                            </FormFile>
                    </div>
                    <Button style={{border : '2px solid #007bff', borderRadius : '15px', color : '#007bff', height: "50px"}}  variant="ligth" type="submit">Enviar</Button>
                </Form>
            </Container>
            <Container style={{margin: "100px auto"}}>
                <div style={{margin: "auto", width: "100%", background: "gray", height: "1px"}}></div>
                <Container style={{margin: "50px auto"}}>
                    {
                        dicas.map((dica, index) => {
                            let role = "";
                            if(dica.usuario.idPerfil==="8853b7d3-eba9-4ac4-901b-72198ad559ac") 
                                role = "PROFESSOR";
                            else 
                                role = "ALUNO";
                            if(dica.idUsuario===idUsuario) {
                                if(dica.urlImagem==="") {
                                    return (
                                        <>
                                            <Card style={{ width: '18rem', margin: "20px auto", boxShadow: "0px 0px 1px black" }}>
                                                <Card.Body style={{padding: "10px"}}>
                                                    <Card.Title style={{fontSize: "15px", display: "flex", justifyContent: "space-between", width: "100%"}}>
                                                        <span style={{color: "#00C2EE"}}>{`(${role}) Eu`}</span>
                                                        <div style={{display: "flex", alignItems: "center", margin: "0"}}>
                                                            <label htmlFor={index} style={{color: "#007bff"}}> <i className="fas fa-pencil-alt" style={{margin: "0 40px", marginRight: "10px"}}></i> </label>
                                                            <input type="button" id={index} value={dica.id} onClick={event=>editar(event.target.value)} style={{display: "none"}}/>
                                                            <label htmlFor={index+0.5} style={{color: "red"}}> <i className="fas fa-trash-alt"></i> </label>
                                                            <input type="button" value={dica.id} id={index+0.5} style={{display: "none"}} onClick={event=>deletar(event.target.value)}/>
                                                        </div>
                                                    </Card.Title>
                                                    <Card>
                                                        <Card.Body style={{padding: "10px"}}>
                                                            <Card.Text style={{fontSize: "15px", textAlign: "justify-all"}}>{dica.texto}</Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    
                                                </Card.Body>
                                            </Card>
                                        </>
                                    )
                                }
                                else {
                                    return (
                                        <>
                                            <Card style={{ width: '18rem', margin: "20px auto", boxShadow: "0px 0px 1px black" }}>
                                                <Card.Body style={{padding: "10px"}}>
                                                    <Card.Title style={{fontSize: "15px", display: "flex", justifyContent: "space-between", width: "100%"}}>
                                                        <span style={{color: "#00C2EE"}}>{`(${role}) Eu`}</span>
                                                        <div style={{display: "flex", alignItems: "center", margin: "0"}}>
                                                            <label htmlFor={index} style={{color: "#007bff"}}> <i className="fas fa-pencil-alt" style={{margin: "0 40px", marginRight: "10px"}}></i> </label>
                                                            <input type="button" id={index} value={dica.id} style={{display: "none"}}  onClick={event=>editar(event.target.value)}/>
                                                            <label htmlFor={index+0.5} style={{color: "red"}}> <i class="fas fa-trash-alt"></i> </label>
                                                            <input type="button" value={dica.id} id={index+0.5} style={{display: "none"}}  onClick={event=>deletar(event.target.value)}/>
                                                        </div>
                                                    </Card.Title>
                                                    <Card>
                                                        <Card.Img src={dica.urlImagem}/>
                                                        <Card.Body style={{padding: "10px"}}>
                                                            <Card.Text style={{fontSize: "15px", textAlign: "justify-all"}}>{dica.texto}</Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    
                                                </Card.Body>
                                            </Card>
                                        </>
                                    )
                                }
                            }
                            else {
                                if(dica.urlImagem==="") {
                                    return (
                                        <>
                                            <Card style={{ width: '18rem', margin: "20px auto", boxShadow: "0px 0px 1px black" }}>
                                                <Card.Body style={{padding: "10px"}}>
                                                    <Card.Title style={{fontSize: "15px", display: "flex", justifyContent: "space-between", width: "100%"}}>
                                                        {`(${role}) ${dica.usuario.nome}`}
                                                    </Card.Title>
                                                    <Card>
                                                        <Card.Body style={{padding: "10px"}}>
                                                            <Card.Text style={{fontSize: "15px", textAlign: "justify-all"}}>{dica.texto}</Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                </Card.Body>
                                            </Card>
                                        </>
                                    )
                                }
                                else {
                                    return (
                                        <>
                                            <Card style={{ width: '18rem', margin: "20px auto", boxShadow: "0px 0px 1px black" }}>
                                                <Card.Body style={{padding: "10px"}}>
                                                    <Card.Title style={{fontSize: "15px", display: "flex", justifyContent: "space-between", width: "100%"}}>
                                                        {`(${role}) ${dica.usuario.nome}`}
                                                    </Card.Title>
                                                    <Card>
                                                        <Card.Img src={dica.urlImagem}/>
                                                        <Card.Body style={{padding: "10px"}}>
                                                            <Card.Text style={{fontSize: "15px", textAlign: "justify-all"}}>{dica.texto}</Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    
                                                </Card.Body>
                                            </Card>
                                        </>
                                    )
                                }
                            }
                        })
                    }
                </Container>
            </Container>   
            <Rodape/>
        </div>
    )
}

export default TimeLine;