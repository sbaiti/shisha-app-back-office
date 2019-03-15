import React from 'react';
import './Fussball.css';
//import config from '../../../config/config.json';



const Fussball = (props) => {
    return (
        <div className="Fussball__home">
            <h2>Fussball In Progress...</h2>
            <img
                src={require('../../../assets/Logo.png')}
                height={'400px'}
                width={'400px'}
                alt='it-baum'>
            </img>
        </div>
    )
}
export default Fussball;