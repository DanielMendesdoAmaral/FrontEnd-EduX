import React, {Component} from "react";
import {url} from "../../utils/constants";
import Titulo from "../titulo";
import jwt_decode from "jwt-decode";

class Ranking extends Component  {
    constructor(props) {
        super(props)
        this.state = {
          users: [],
          carregando: false,
          erro: false
        }
    }

    //Preenche o cabecalho da tabela com os nomes dos atributos do json obtido.
    renderTableHeader = () => {
        return (
            <tr>
                <th>Posição</th>
                <th>Avatar</th>
                <th>Nome</th>
                <th>Pontos</th>
            </tr>
        )
    }

    //Preenche as colunas com os valores correspondentes.
    renderTableRows = () => {
        let usuarios = [];
        let obj={};

        this.state.users.filter(user => user.alunosTurmas.length>=1).map((user, index)=> {
            let soma=0;
            obj={};
            user.alunosTurmas.filter(alunoTurma => alunoTurma.objetivosAlunos.length>=1).map((alunoTurma, index) => {
                alunoTurma.objetivosAlunos.map(objetivoAluno => {
                    soma+=objetivoAluno.nota;
                })

            })
            obj = {
                usuario: user,
                notaTotal: soma
            }

            usuarios.push(obj);
        })

        usuarios.sort(function(a,b) {
            return (b.notaTotal > a.notaTotal) ? 1 : ((a.notaTotal > b.notaTotal) ? -1 : 0);
        })

        return usuarios.map((usuario, index) => {
            return (
                <tr key={index}>
                    {index===0&&<td><div style={{fontWeight: "bold", fontSize: "20px"}}>#1 <i style={{color: "#f7bc14"}} class="fas fa-trophy"></i></div></td>}
                    {index===0&&<td><div style={{width: "40px", height: "40px", background: "#f7bc14", color: "white", borderRadius: "100px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "20px"}}>{usuario.usuario.nome.substring(0,1).toUpperCase()}</div></td>}
                    {index===1&&<td><div style={{fontWeight: "bold", fontSize: "20px"}}>#2 <i style={{color: "#777"}} class="fas fa-trophy"></i></div></td>}
                    {index===1&&<td><div style={{width: "40px", height: "40px", background: "#777", color: "white", borderRadius: "100px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "20px"}}>{usuario.usuario.nome.substring(0,1).toUpperCase()}</div></td>}
                    {index===2&&<td><div style={{fontWeight: "bold", fontSize: "20px"}}>#3 <i style={{color: "#A46940"}} class="fas fa-trophy"></i></div></td>}
                    {index===2&&<td><div style={{width: "40px", height: "40px", background: "#A46940", color: "white", borderRadius: "100px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "20px"}}>{usuario.usuario.nome.substring(0,1).toUpperCase()}</div></td>}
                    {index>2&&<td><div style={{fontWeight: "bold", fontSize: "20px"}}>{`#${index+1}`}</div></td>}
                    {index>2&&<td><div style={{width: "40px", height: "40px", background: "#dedede", color: "white", borderRadius: "100px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "20px"}}>{usuario.usuario.nome.substring(0,1).toUpperCase()}</div></td>}
                    {index===0&&<td><a href={`/aluno/detalhes/${usuario.usuario.id}g&${index+1}&${usuario.notaTotal}`}>{usuario.usuario.nome}</a></td>}
                    {index===1&&<td><a href={`/aluno/detalhes/${usuario.usuario.id}s&${index+1}&${usuario.notaTotal}`}>{usuario.usuario.nome}</a></td>}
                    {index===2&&<td><a href={`/aluno/detalhes/${usuario.usuario.id}b&${index+1}&${usuario.notaTotal}`}>{usuario.usuario.nome}</a></td>}
                    {index>2&&<td><a href={`/aluno/detalhes/${usuario.usuario.id}n&${index+1}&${usuario.notaTotal}`}>{usuario.usuario.nome}</a></td>}
                    <td>{usuario.notaTotal}</td>
                </tr>
            )
        })    
    }

    //Executa quando os componentes estiverem preparados.
    //A funcao assincrona faz uma requisicao a Api. O await aparece porque demora um tempo para a requisicao ser atendida.
    async componentDidMount() {
        this.setState({ carregando: true })
        const response = await fetch(url+"/usuario")
    
        if (response.ok) {
            const users = await response.json()
            this.setState({ users, carregando: false })
        } else {
            this.setState({ erro: true, carregando: false })
        }
    }



    //Junta os dados e processos anteriores, renderizando uma tabela com todos os valores que obtidos (mockApi -> colunas e cabecalho -> tabela).
    render() {
        const { users, carregando, erro } = this.state
        const token = localStorage.getItem("token-edux");
        const nomeUsuario = jwt_decode(token).nameid;

        if (carregando) {
            return (
                <div style={{height: "100vh", width: "90%", margin: "auto", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <div className="spinner-border text-success" role="status"></div>
                    <span className="sr-only">Loading...</span>
                </div>
            )
        }

        if (erro) {
            return <div>Erro!</div>
        }

        return users.length > 0
            ? (
                <>
                    <Titulo titulo={`Olá, ${nomeUsuario}!`} chamada="Começe dando uma olhada no ranking geral logo abaixo. :)"/>
                    <div style={{margin: "50px"}}>
                        
                        <table className = "table ">
                            <thead>
                                {this.renderTableHeader()}
                            </thead>
                            <tbody>
                                {this.renderTableRows()}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <div>
                    Tabela vazia.
                </div>
            )
      
    }
}

export default Ranking;