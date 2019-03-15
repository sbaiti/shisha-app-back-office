import React from 'react';
import ActivePose from '../../../utils/ActivePose/ActivePose';
import InputText from '../../Common/InputText';
import { Label, Input } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import config from '../../../config/config.json';
import './Stempelkarte.css';
import { Greet } from '../../../utils/functions';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class Stempelkarte extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Password: '',
            newPassword: '',
            newPassword2: '',
            shishaMsg: '',
            cocktailMsg: '',
            idRestaurant: localStorage.getItem('idRestaurant')

        }
    }

    componentDidMount() {
        this.getRestaurant();
    }

    getRestaurant = () => {
        axios.get(`${config.urlServer.url}:${config.urlServer.port}/Restaurant/ById`, { params: { idRestaurant: this.state.idRestaurant } })
            .then((res) =>
                this.setState({
                    cocktailMsg: res.data.restaurants.cocktailMsg,
                    shishaMsg: res.data.restaurants.shishaMsg
                })).catch((error) => {
                    if (error.response)
                        toast.error(<Greet msg={error.response.data.msg} />)
                    else
                        toast.error(<Greet msg={'Server fehler'} />)
                });
    }

    handleChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value });
    };

    onChangePassword = () => {
        const { newPassword, idRestaurant, Password } = this.state;
        confirmAlert({
            title: 'Bestätigen Sie die Eingabe',
            message: 'Bist du sicher das zu tun?.',
            buttons: [
                {
                    label: 'Ja',
                    onClick: () => axios.post(`${config.urlServer.url}:${config.urlServer.port}/Restaurant/verifMtpAndUpdate`, { Password, newPassword, idRestaurant })
                        .then((res) => {
                            this.props.resetActiveComponent();
                        }
                        ).catch((error) => {
                            if (error.response)
                                toast.error(<Greet msg={error.response.data.msg} />)
                            else
                                toast.error(<Greet msg={'Server fehler'} />)
                        })
                },
                {
                    label: 'Nein'
                }
            ]
        })
    }

    submitData = () => {
        const { newPassword, newPassword2 } = this.state;

        if ((newPassword === '') || (newPassword2 === '') || (newPassword !== newPassword2)) {
            toast.error(<Greet msg={'Bitte überprüfen Sie Ihr neues Passwort'} />);
            return false;
        }
        return true;
    }

    sendMsg = () => {
        const { shishaMsg, cocktailMsg, idRestaurant } = this.state;
        confirmAlert({
            title: 'Bestätigen Sie die Eingabe',
            message: 'Bist du sicher das zu tun?.',
            buttons: [
                {
                    label: 'Ja',
                    onClick: () => axios.put(`${config.urlServer.url}:${config.urlServer.port}/Restaurant/updateMsg`, { idRestaurant, shishaMsg, cocktailMsg })
                        .then((res) => {
                            this.props.resetActiveComponent();
                        }
                        ).catch((error) => {
                            if (error.response)
                                toast.error(<Greet msg={error.response.data.msg} />)
                            else
                                toast.error(<Greet msg={'Server fehler'} />)
                        })
                },
                {
                    label: 'Nein'
                }
            ]
        })

    }

    render() {
        return (
            <div className="stempelkarte__home">
                <ActivePose
                    title={'Stempelkarte Seite'}
                />
                <div className="home">
                    <div className="home__stempelKorte">
                        <div className="label">
                            <Label for="newPassword">Passwort ändern : </Label>
                        </div>
                        <div className="form__stempelKorte">
                            <div className="button__password">
                                <InputText
                                    id="Password"
                                    name="Password"
                                    type="password"
                                    onChange={this.handleChange}
                                    placeholder="Alter passwort" />
                            </div>
                            <div className="button__password">
                                <InputText
                                    id="newPassword"
                                    name="newPassword"
                                    type="text"
                                    onChange={this.handleChange}
                                    placeholder="Neues passwort" />
                            </div>
                            <div className="button__password">
                                <InputText
                                    id="newPassword2"
                                    name="newPassword2"
                                    type="password"
                                    onChange={this.handleChange}
                                    placeholder="Neues passwort" />
                            </div>
                            <div className="button__admin">
                                <button className="btn btn-primary"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (this.submitData()) {
                                            this.onChangePassword();
                                        }
                                    }}>
                                    <i className="fas fa-check-circle"></i>  {' '}

                                    OK </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="msg">
                            <Label for="shishaMsg" className="msg1">Shisha Gewinn Text eintragen : </Label>
                            <Input
                                name="shishaMsg"
                                value={this.state.shishaMsg}
                                id="shishaMsg"
                                type="textarea"
                                onChange={this.handleChange} />
                            <Label for="cocktailMsg" className="msg1">Cocktail Gewinn Text eintragen : </Label>
                            <Input
                                name="cocktailMsg"
                                id="cocktailMsg"
                                type="textarea"
                                value={this.state.cocktailMsg}
                                onChange={this.handleChange} />
                            <div className="button__admin">
                                <button className="btn btn-primary"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        this.sendMsg();
                                    }}>
                                    <i className="fas fa-check-circle"></i>  {' '}
                                    Senden</button>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover
                />
            </div>
        )
    }
}
export default Stempelkarte;