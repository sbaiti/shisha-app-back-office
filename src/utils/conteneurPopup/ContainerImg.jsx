import React from 'react';
import './Container.css';

const ContainerImg = (props) => {
    return (
        <div className="Container__Img__selected">
            {props.data}
            <div>
                <h3>
                    {props.nameEvent !== 'undefined' ? props.nameEvent : ""}
                </h3>
            </div>
            <div>
                <h4>
                    {props.Description !== "undefined" ? props.Description : ""}
                </h4>
            </div>
        </div>
    )
}




export default ContainerImg;