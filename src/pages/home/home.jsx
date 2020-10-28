import React from 'react';
import Menu from '../../components/menu/menu';
import Rodape from '../../components/rodape/rodape';
import {Carousel, Jumbotron, Button, Container, Row} from 'react-bootstrap';

const Home = () => {

    return(

        <div>
            <Menu/>

            <Carousel style={{margin : '20px'}}>
                
                <Carousel.Item >
                    <Row >

                        <img 

                            className="d-block w-50"
                            src="https://minutomt.com.br/wp-content/uploads/2020/07/senai_fb.jpg" 
                            alt="First Slide"

                        /> 

                 
    

                        <img 

                            className="d-block w-50"
                            src="https://s3.amazonaws.com/bucket-gw-cni-static-cms-si/portaldaindustria/noticias/media/imagem_plugin_0d3e5d11-47ba-4485-bbc1-1c0b112a3d59.jpg" 
                            alt="First Slide"

                        /> 

                    </Row>
                </Carousel.Item>

                <Carousel.Item >
                    <Row >

                        <img 

                            className="d-block w-50"
                            src="https://minutomt.com.br/wp-content/uploads/2020/07/senai_fb.jpg" 
                            alt="First Slide"

                        /> 
    

                        <img 

                            className="d-block w-50"
                            src="https://s3.amazonaws.com/bucket-gw-cni-static-cms-si/portaldaindustria/noticias/media/imagem_plugin_0d3e5d11-47ba-4485-bbc1-1c0b112a3d59.jpg" 
                            alt="First Slide"

                        /> 

                    </Row>
                </Carousel.Item>

                <Carousel.Item >
                    <Row >

                        <img 

                            className="d-block w-50"
                            src="https://minutomt.com.br/wp-content/uploads/2020/07/senai_fb.jpg" 
                            alt="First Slide"

                        /> 
    

                        <img 

                            className="d-block w-50"
                            src="https://s3.amazonaws.com/bucket-gw-cni-static-cms-si/portaldaindustria/noticias/media/imagem_plugin_0d3e5d11-47ba-4485-bbc1-1c0b112a3d59.jpg" 
                            alt="First Slide"

                        /> 

                    </Row>
                </Carousel.Item>
            </Carousel>
            
            <Rodape/>
        </div>

    )

}

export default Home;