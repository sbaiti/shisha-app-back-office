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



class AddAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.state = {
            restaurants: '',
            idRestaurant: '',
            Name: '',
            Login: '',
            Password: '',
            Phone: '',
            Role: 'admin'
        }
    }

    componentDidMount() {
        this.getRestaurant();
    }
    getRestaurant = () => {
        axios.get(`${config.urlServer.url}:${config.urlServer.port}/Restaurant`)
            .then((res) =>
                this.setState({
                    restaurants: res.data.restaurants
                })).catch((error) => {
                    if (error.response)
                        toast.error(<Greet msg={error.response.data.msg} />)
                    else
                        toast.error(<Greet msg={'Server fehler'} />)
                });
    }

    submitData = () => {
        const { Name, Login, Password, Phone, idRestaurant, Password1 } = this.state;
        if (!Name) {
            toast.error(<Greet msg={'Name ist erforderlich'} />);
            return false;
        }
        if (!Login) {
            toast.error(<Greet msg={'Login ist erforderlich'} />);
            return false;
        }
        if (!Phone) {
            toast.error(<Greet msg={'Phone ist erforderlich'} />);
            return false;
        }
        if (!idRestaurant) {
            toast.error(<Greet msg={'Role ist idRestaurant'} />);
            return false;
        }
        if (!Password || !Password1 || (Password !== Password1)) {
            toast.error(<Greet msg={'Password ist erforderlich'} />);
            return false;
        }

        return true
    }


    handleChange = ({ target: { value, name } }) => {
        this.setState({ [name]: value });
    };

    addUser = () => {
        const { Name, Login, Password, Phone, Role, idRestaurant } = this.state;
        const createdBy = localStorage.getItem('saveUserLogin');
        const data = {
            Name, Login, Password, Phone, Role, idRestaurant, createdBy
        };

        axios.post(`${config.urlServer.url}:${config.urlServer.port}/UserRestaurant/Add`, data)
            .then((res) => {
                toast.success(<Greet msg={'grüßen'} />)
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
        return (
            <div className="home__addUser">
                <ActivePose
                    title={'Add Admin User'}
                />
                <div className="form__users__add">
                    <div className="new__user">
                        <Form innerRef={this.formRef}>
                            <div className="flex__input__date">
                                <Label for="Name" className="label__form__user">Name  :   </Label>
                                <center>
                                    <InputText
                                        id="Name"
                                        name="Name"
                                        type="text"
                                        onChange={this.handleChange}
                                    />
                                </center>
                            </div>
                            <div className="flex__input__date">
                                <Label for="Login" className="label__form__user">Login :   </Label>
                                <center>
                                    <InputText
                                        id="Login"
                                        name="Login"
                                        type="text"
                                        onChange={this.handleChange}
                                    />
                                </center>
                            </div>
                            <div className="flex__input__date">
                                <Label for="Password" className="label__form__user">Password :   </Label>
                                <center>
                                    <InputText
                                        id="Password"
                                        name="Password"
                                        type="password"
                                        onChange={this.handleChange}
                                    />
                                </center>
                            </div>
                            <div className="flex__input__date">
                                <Label for="Password1" className="label__form__user">Comfirm Password :   </Label>
                                <center>
                                    <InputText
                                        id="Password1"
                                        name="Password1"
                                        type="password"
                                        onChange={this.handleChange}
                                    />
                                </center>
                            </div>
                            <div className="flex__input__date">
                                <Label for="Phone" className="label__form__user"> Phone :   </Label>
                                <center>
                                    <InputText
                                        id="Phone"
                                        name="Phone"
                                        type="number"
                                        onChange={this.handleChange}
                                    />
                                </center>
                            </div>
                            {this.state.restaurants.length >= 1 && <div className="flex__input__date">
                                <Label for="role" className="label__form__user"> Restaurant :   </Label>
                                <center>
                                    <Input
                                        onChange={this.handleChange}
                                        type="select" name="idRestaurant" id="idRestaurant">
                                        {this.state.restaurants.map(res =>
                                            <option value={res._id}>{res.Name}</option>)}
                                    </Input>
                                </center>
                            </div>}
                            <div className="button__admin__user">
                                <Button
                                    color="success"
                                    size="lg"
                                    onClick={() => {
                                        if (this.submitData()) {
                                            confirmAlert({
                                                title: 'Bestätigen Sie die Eingabe',
                                                message: 'Bist du sicher das zu tun?.',
                                                buttons: [
                                                    {
                                                        label: 'Ja',
                                                        onClick: () => {
                                                            this.addUser();
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
                        </Form>
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

export default AddAdmin;




