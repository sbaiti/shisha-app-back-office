import React from 'react';
import ActivePose from '../../../utils/ActivePose/ActivePose';
import { Label, Input } from 'reactstrap';
import axios from 'axios';
import config from '../../../config/config.json';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './MsgPush.css';

class MsgPush extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: ''
        }
    }

    handleChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value });
    };

    sendMsg = () => {
        const { msg, idRestaurant } = this.state;
        confirmAlert({
            title: 'Bestätigen Sie die Eingabe',
            message: 'Bist du sicher das zu tun?.',
            buttons: [
                {
                    label: 'Ja',
                    onClick: () => axios.post(`${config.urlServer.url}:${config.urlServer.port}/Notification/addNotification`, { idRestaurant, msg })
                        .then((res) => {
                            this.props.resetActiveComponent();
                        }
                        )
                },
                {
                    label: 'Nein'
                }
            ]
        })

    }

    render() {
        return (
            <div className="Msg__home">
                <ActivePose
                    title={'Mitteilung Seite'}
                />
                <div className="msg__home">
                    <Label for="msg" className="msg1">Mitteilung : </Label>
                    <Input
                        name="msg"
                        id="msg"
                        type="textarea"
                        className="msg2"
                        onChange={this.handleChange} />
                    <div className="button__admin__msg">
                        <button className="btn btn-primary"
                            onClick={(e) => {
                                e.preventDefault();
                                this.sendMsg();
                            }}>
                            <i className="fas fa-check-circle"></i>  {' '}
                            drücken</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default MsgPush;