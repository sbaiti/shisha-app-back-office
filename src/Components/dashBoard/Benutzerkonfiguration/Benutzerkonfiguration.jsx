import React from 'react';
import ActivePose from '../../../utils/ActivePose/ActivePose';
import InputText from '../../Common/InputText';
import { Label, Input, Button, Form } from 'reactstrap';
import config from '../../../config/config.json';
import axios from 'axios';
import PopupUser from '../../../utils/conteneurPopup/PopupUser';
import { ToastContainer, toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './Benutzerkonfiguration.css';
import YesDataUser from './YesDataUser';
import { Greet, NoData } from '../../../utils/functions';
import PopUp from '../../../utils/popup/Popup';
class Benutzerkonfiguration extends React.Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.state = {
            show: false,
            users: [],
            Name: '',
            Login: '',
            Password: '',
            Phone: '',
            Role: ''
        }
    }

    componentDidMount() {
        this.getUser();
    }

    submitData = () => {
        const { Name, Login, Password, Phone, Role, Password1 } = this.state;
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
        if (!Role) {
            toast.error(<Greet msg={'Role ist erforderlich'} />);
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
        const idRestaurant = localStorage.getItem('idRestaurant');
        const createdBy = localStorage.getItem('saveUserLogin');
        const { Name, Login, Password, Phone, Role } = this.state;
        const data = {
            Name, Login, Password, Phone, Role, idRestaurant, createdBy
        };

        axios.post(`${config.urlServer.url}:${config.urlServer.port}/UserRestaurant/Add`, data)
            .then((res) => {
                toast.success(<Greet msg={'grüßen'} />)
                this.getUser();
            })
            .catch((error) => {
                if (error.response)
                    toast.error(<Greet msg={error.response.data.msg} />)
                else
                    toast.error(<Greet msg={'Server fehler'} />)
            });
    }
    getUser = () => {
        const idRestaurant = localStorage.getItem('idRestaurant');
        axios.get(`${config.urlServer.url}:${config.urlServer.port}/UserRestaurant/ByIdRestaurant`, { params: { idRestaurant } })
            .then((res) => {
                this.setState({ users: res.data.users })
            })
            .catch((error) => {
                if (error.response)
                    toast.error(<Greet msg={error.response.data.msg} />)
                else
                    toast.error(<Greet msg={'Server fehler'} />)
            });
    }

    setData = (user) => {
        if (!user)
            this.setState({ show: !this.state.show });
        else
            this.setState({ show: !this.state.show, user });
    }

    reset = () => {
        this.formRef.current.reset();
    }

    deleteUser = (id) => {
        axios.put(`${config.urlServer.url}:${config.urlServer.port}/UserRestaurant/updateUserRestaurant`, { idUserRestaurant: id })
            .then((res) => {
                toast.success(<Greet msg={'grüßen'} />);
                this.getUser();
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
        const { show, user, users } = this.state;
        const Login = localStorage.getItem('saveUserLogin');
        return (
            <div>
                {
                    show && (
                        <PopUp openHidePopup={this.setData} >
                            <PopupUser
                                setData={this.setData}
                                deleteUser={this.deleteUser}
                                user={user}
                            />
                        </PopUp>
                    )
                }
                <div className="home__addUser">
                    <ActivePose
                        title={'Benutzer hinzufügen'}
                    />
                    <div className="users__screen">
                        <div className="form__users__add">
                            <div className="new__user">
                                <Form innerRef={this.formRef}>
                                    <div className="flex__input__date">
                                        <Label for="Name" className="label__form__user">Name Benutzer :   </Label>
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
                                        <Label for="Login" className="label__form__user">Anmeldung Benutzer :   </Label>
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
                                        <Label for="Password" className="label__form__user">Passwort :   </Label>
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
                                        <Label for="Password1" className="label__form__user">Passwort bestätigen :   </Label>
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
                                        <Label for="Phone" className="label__form__user"> Telefonnummer :   </Label>
                                        <center>
                                            <InputText
                                                id="Phone"
                                                name="Phone"
                                                type="number"
                                                onChange={this.handleChange}
                                            />
                                        </center>
                                    </div>
                                    <div className="flex__input__date">
                                        <Label for="role" className="label__form__user"> Rollen :   </Label>
                                        <center>
                                            <Input
                                                onChange={this.handleChange}
                                                type="select" name="Role" id="Role">
                                                <option>admin</option>
                                                <option>Mitarbeiter</option>
                                                <option>Beabachter</option>
                                            </Input>
                                        </center>
                                    </div>
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
                        <div className="user__in__res">
                            <h2>Benutzers</h2>
                            {this.state.users.length >= 1 ?
                                <YesDataUser
                                    setData={this.setData}
                                    users={users.filter(user => user.Role !== 'superAdmin' && user.createdBy !== 'l&s2019' && user.Login !== Login)}
                                />
                                :
                                <NoData name={'Benutzers'} />}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Benutzerkonfiguration;

