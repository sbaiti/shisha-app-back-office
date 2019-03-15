import React from 'react';
//import axios from 'axios';
//import config from '../../../config/config.json';
//import { ToastContainer, toast } from 'react-toastify';
import './Benutzerkonfiguration.css';
//import { Greet } from '../../../utils/functions';


const YesDataUser = (props) => {
    return (
        <div>
            <div className="restaurant__home">
                <div className="Header__user">
                    Benutzer
                    </div>
                <div className="tab__user">
                    <div className="item__user">
                        NAME
                </div>
                    <div className="item__user">
                        Anmeldung
                    </div>
                    <div className="item__user">
                        Rollen
                </div>
                </div>
                <div className="ctn__user">
                    {props.users.map((user, key) =>
                        <div className="YesDatauser" key={key} onClick={() => props.setData(user)}>
                            <div className="item__user">
                                {user.Name}
                            </div>
                            <div className="item__user">
                                {user.Login}
                            </div>
                            <div className="item__user">
                                {user.Role}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default YesDataUser;