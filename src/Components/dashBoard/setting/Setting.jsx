import React from 'react';
import ActivePose from '../../../utils/ActivePose/ActivePose';
import InputText from '../../Common/InputText';
import { Label, Input, Button, Form } from 'reactstrap';
import config from '../../../config/config.json';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { Greet } from '../../../utils/functions';

class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: localStorage.getItem('Name'),
            Login: localStorage.getItem('Login'),
            idRestaurant: localStorage.getItem('idRestaurant'),
            Password: '',
            newPassword: '',
        }
    }

    componentDidMount() {
        this.getLogoRestaurant();
    }

    onUploadFile = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        this.setState({
            file
        },
            () => this.addFile()
        );
    }

    addFile() {
        let preview = document.getElementById('event');
        let file = document.querySelector('input[type=file]').files[0];
        let reader = new FileReader()
        reader.addEventListener("load", function () {
            preview.src = reader.result;
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    submitData = () => {
        const { Name, Login, Password } = this.state;
        if (!Name) {
            toast.error(<Greet msg={'Name ist erforderlich'} />);
            return false;
        }
        if (!Login) {
            toast.error(<Greet msg={'Login ist erforderlich'} />);
            return false;
        }
        if (!Password) {
            toast.error(<Greet msg={'Password ist erforderlich'} />);
            return false;
        }
        return true
    }


    handleChange = ({ target: { value, name } }) => {
        this.setState({ [name]: value });
    };

    getLogoRestaurant = () => {
        axios.get(`${config.urlServer.url}:${config.urlServer.port}/File/List`,
            { params: { idRestaurant: this.state.idRestaurant, Type: 'Logo' } }).then((res) => {
                if (res.data.file.length >= 1)
                    this.setState({
                        src: res.data.file
                    });
            }
            );
    }

    editRestaurant = () => {
        const { Name, Login, Password, newPassword, idRestaurant } = this.state;
        const data = {
            Name, Login, Password, newPassword, idRestaurant
        };

        axios.put(`${config.urlServer.url}:${config.urlServer.port}/Restaurant/updateRestaurant`, data)
            .then((res) => {
                let formData = new FormData();
                formData.append('Type', 'Logo');
                formData.append('idRestaurant', this.state.idRestaurant);
                formData.append('image', this.state.file);
                const configRequest = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                };
                axios.put(`${config.urlServer.url}:${config.urlServer.port}/File/updateLogo`, formData, configRequest)
                    .then((res) => toast.success(<Greet msg={'success !'} />))
                    .catch((error) => {
                        if (error.response)
                            toast.error(<Greet msg={error.response.data.msg} />)
                        else
                            toast.error(<Greet msg={'Server fehler'} />)
                    })
            }

            )
            .catch((error) => {
                if (error.response)
                    toast.error(<Greet msg={error.response.data.msg} />)
                else
                    toast.error(<Greet msg={'Server fehler'} />)
            });
    }

    render() {
        return (
            <div className="admin__home">
                <ActivePose
                    title={'Restaurant bearbeiten'}
                />
                <Form>
                    <div className="formm">
                        <div className="flex__input__date">
                            <Label for="Login" className="label__form__setting">Anmeldung :   </Label>
                            <center>
                                <InputText
                                    id="Login"
                                    name="Login"
                                    type="text"
                                    value={this.state.Login}
                                    onChange={this.handleChange}
                                />
                            </center>
                        </div>
                        <div className="flex__input__date">
                            <Label for="Name" className="label__form__setting">Name Restaurant :   </Label>
                            <center>
                                <InputText
                                    id="Name"
                                    name="Name"
                                    type="text"
                                    value={this.state.Name}
                                    onChange={this.handleChange}
                                />
                            </center>
                        </div>
                        <div className="flex__input__date">
                            <Label for="Password" className="label__form__setting">Altes Passwort :   </Label>
                            <center>
                                <InputText
                                    id="Password"
                                    name="Password"
                                    type="text"
                                    value={this.state.Password}
                                    onChange={this.handleChange}
                                />
                            </center>
                            <Label for="newPassword" className="label__form__setting">Neues Kennwort :   </Label>
                            <center>
                                <InputText
                                    id="newPassword"
                                    name="newPassword"
                                    value={this.state.newPassword}
                                    type="password"
                                    onChange={this.handleChange}
                                />
                            </center>
                        </div>
                        <div className="flex__input__date">
                            <Label for="image" className="label__form__setting">Logo :   </Label>
                            <center>
                                <Input
                                    type="file"
                                    name="image"
                                    ref="attachments"
                                    id="exampleFile"
                                    multiple
                                    accept="image/png, image/jpeg"
                                    onChange={this.onUploadFile}
                                >
                                </Input>
                            </center>
                        </div>
                        {this.state.src && <center>
                            <div className="img__uploaded">
                                <img
                                    src={`${config.urlServer.url}:${config.urlServer.port}/File/Images?image=` + this.state.src[0].Name}
                                    height="100" width="200" alt="event" id="event" /></div>
                        </center>}
                        <div className="button__admin">
                            <Button
                                color="success"
                                size="lg"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (this.submitData()) {
                                        confirmAlert({
                                            title: 'Bestätigen Sie die Eingabe',
                                            message: 'Bist du sicher das zu tun?.',
                                            buttons: [
                                                {
                                                    label: 'Ja',
                                                    onClick: () => {
                                                        this.editRestaurant();
                                                        toast.success(<Greet msg={'Erfolg'} />)
                                                        this.props.onLogOut();
                                                    }
                                                },
                                                {
                                                    label: 'Nein'
                                                }
                                            ]
                                        })
                                    }
                                }
                                }>
                                <i className="fas fa-check-circle"></i>  {' '}
                                Einreichen
                                </Button>
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
                </Form>
            </div>
        )
    }
}
export default Setting;
