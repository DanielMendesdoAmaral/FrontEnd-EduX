import React from 'react';
import Menu from '../../components/menu/menu';
import Rodape from '../../components/rodape/rodape';
import { Container} from 'react-bootstrap';
import './timeline.css'


const TimeLine = () => {

    return(

     <div>

        <Menu/>


        <div class="tweetForm"> 
            <div>

                <textarea id="txta" placeholder="O que você está pensando" rows="5" cols="50"></textarea>

            </div>

        <div class="btn">

          <button id="btn">Enviar</button>

        </div>

      </div>

        <Rodape/>

    </div>


    )

}

export default TimeLine;