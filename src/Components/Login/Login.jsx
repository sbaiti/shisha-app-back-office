import React from 'react';
import InputText from '../Common/InputText';
import axios from 'axios';
import config from '../../config/config.json';
import { AwesomeButton } from 'react-awesome-button';
import { ToastContainer, toast } from 'react-toastify';
import { FormGroup, Label, Input } from 'reactstrap';
import './Login.css';


import { saveUserdata, saveUserIdRestaurant, Greet } from '../../utils/functions';
class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
    handleChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value });
    };

    onLoginUser = () => {
        const user = this.state;
        axios.post(`${config.urlServer.url}:${config.urlServer.port}/UserRestaurant/Login`, user)
            .then((res) => {
                this.props.onLogin();
                this.props.setServiceUser(res.data.Role);
                if (this.state.auto === "on")
                    saveUserdata({ ...user, idUser: res.data._id, token: res.data.token, idRestaurant: res.data.idRestaurant, role: res.data.Role, Name: res.data.Name });
                else
                    saveUserIdRestaurant({ idUser: res.data._id, idRestaurant: res.data.idRestaurant, role: res.data.Role, Login: this.state.Login, Name: res.data.Name })
            }
            ).catch((error) => {
                if (error.response)
                    toast.error(<Greet msg={error.response.data.msg} />)
                else
                    toast.error(<Greet msg={'Server fehler'} />)
            });
    }

    render() {
        return (
            <div className="sectionLogin">
                <form>
                    <img className="imgLogo" src={require('../../assets/Logo.png')} alt='it-baum' />
                    <center>
                        <div className="button__login">
                            <InputText
                                id="login"
                                name="Login"
                                type="text"
                                onChange={this.handleChange}
                                placeholder="login" />
                        </div>
                        <div className="button__login">
                            <InputText
                                id="password"
                                name="Password"
                                type="password"
                                onChange={this.handleChange}
                                placeholder="password" />
                        </div>
                        <div className="auto__connect">
                            <FormGroup check>
                                <Label check>
                                    <Input
                                        id="auto"
                                        name="auto"
                                        onChange={this.handleChange}
                                        type="checkbox" />{' '}
                                    automatische Verbindung
                    </Label>
                            </FormGroup>
                        </div>
                    </center>
                </form>
                <div className="login__button">
                    <AwesomeButton
                        action={() => {
                            if (this.state.Login && this.state.Password)
                                this.onLoginUser()
                            else
                                toast.error(<Greet msg={'Bitte füllen Sie die Eingaben aus'} />)
                        }}
                    >
                        <i className="fas fa-check-circle"></i>  {' '}
                        Verbindung
    </AwesomeButton>
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

export default Login;

