import React from 'react';
import ActivePose from '../../../utils/ActivePose/ActivePose';
import axios from 'axios';
import config from '../../../config/config.json';
import { ToastContainer, toast } from 'react-toastify';
import './Users.css';
import { Greet } from '../../../utils/functions';


export default class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers = () => {
        const idRestaurant = localStorage.getItem('idRestaurant');
        axios.get(`${config.urlServer.url}:${config.urlServer.port}/User`, { params: { idRestaurant: idRestaurant } })
            .then((res) => {
                this.setState({
                    users: res.data.users
                })
            }).catch((error) => {
                if (error.response)
                    toast.error(<Greet msg={error.response.data.msg} />)
                else
                    toast.error(<Greet msg={'Server fehler'} />)
            });
    }

    openHidePopup = () => {
        this.setState({ isDetail: !this.state.isDetail });
    }

    selectUser = (user) => {
        this.setState({ itemSelected: user });
    }

    render() {
        const { users } = this.state;
        return (
            <div>
                <ActivePose
                    title={'Kunden'}
                />
                <div className="restaurant__home">
                    <div className="Header__user">
                        Kunden
                    </div>
                    <div className="tab__user">
                        <div className="item__user">
                            NAME
                </div>
                        <div className="item__user">
                            E-Mail
                </div>
                        <div className="item__user">
                            Datum der Registrierung
                </div>
                    </div>
                    <div className="ctn__user">
                        {users.map((user, key) =>
                            <div className="YesDatauser" key={key}>
                                <div className="item__user">
                                    {user.Name}
                                </div>
                                <div className="item__user">
                                    {user.Email}
                                </div>
                                <div className="item__user">
                                    {user.DateCreation.substring(0, user.DateCreation.indexOf('('))}
                                </div>
                            </div>
                        )}
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
