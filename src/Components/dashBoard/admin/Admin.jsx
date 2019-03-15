import React from 'react';
import ActivePose from '../../../utils/ActivePose/ActivePose';
import InputText from '../../Common/InputText';
import { Label, Input, Button, Form } from 'reactstrap';
import config from '../../../config/config.json';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './Admin.css';




import { Greet } from '../../../utils/functions';

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.state = {
            imgSelect: false,
            Name: '',
            appId: '',
            appAuthKey: '',
            userAuthKey: ''

        }
    }

    onUploadFile = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        this.setState({
            file,
            imgSelect: true
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
        }, false)
        if (file) {
            reader.readAsDataURL(file);
        }
    }

    submitData = () => {
        const { imgSelect, Name, Login, Password } = this.state;
        if (!(imgSelect)) {
            toast.error(<Greet msg={'bitte wählen Sie eine Datei aus !'} type={true} />);
            return false;
        }
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

    addRestaurant = () => {
        const { Name, appAuthKey, appId, userAuthKey } = this.state;
        const data = {
            Name, appAuthKey, appId, userAuthKey
        };

        axios.post(`${config.urlServer.url}:${config.urlServer.port}/Restaurant/Add`, data)
            .then((res) => {
                this.setState({ idRestaurant: res.data.idRestaurant },
                    () => {
                        let formData = new FormData();
                        formData.append('Type', 'Logo');
                        formData.append('idRestaurant', this.state.idRestaurant);
                        formData.append('image', this.state.file);
                        const configRequest = {
                            headers: {
                                'content-type': 'multipart/form-data'
                            }
                        };
                        axios.post(`${config.urlServer.url}:${config.urlServer.port}/File/Photos`, formData, configRequest)
                            .then((res) => toast.success(<Greet msg={'success !'} />))
                            .catch((error) => {
                                if (error.response)
                                    toast.error(<Greet msg={error.response.data.msg} />)
                                else
                                    toast.error(<Greet msg={'Server fehler'} />)
                            })
                    }
                )
            })
            .catch((error) => {
                if (error.response)
                    toast.error(<Greet msg={error.response.data.msg} />)
                else
                    toast.error(<Greet msg={'Server fehler'} />)
            });
    }

    reset = () => {
        this.formRef.current.reset();
    }

    render() {
        const { imgSelect } = this.state;
        return (
            <div className="admin__home">
                <ActivePose
                    title={'Add Restaurant'}
                />
                <Form innerRef={this.formRef}>
                    <div className="formm">
                        <div className="flex__input__date">
                            <Label for="Name" className="label__form">Name Restaurant :   </Label>
                            <InputText
                                id="Name"
                                name="Name"
                                type="text"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="flex__input__date">
                            <Label for="userAuthKey" className="label__form">User Auth Key :   </Label>
                            <InputText
                                id="userAuthKey"
                                name="userAuthKey"
                                type="text"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="flex__input__date">
                            <Label for="appAuthKey" className="label__form">App Auth Key :   </Label>
                            <InputText
                                id="appAuthKey"
                                name="appAuthKey"
                                type="text"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="flex__input__date">
                            <Label for="appId" className="label__form">App Id :   </Label>
                            <InputText
                                id="appId"
                                name="appId"
                                type="text"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="flex__input__date">
                            <Label for="image" className="label__form">Logo :   </Label>
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
                        </div>
                        {imgSelect &&
                            <center>
                                <div className="img__uploaded">
                                    <img
                                        src="" height="100" width="200" alt="event" id="event" /></div>
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
                                                        this.addRestaurant();
                                                        this.reset();
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
                                hinzufügen
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
export default Admin;
