import React from 'react';
import ActivePose from '../../../utils/ActivePose/ActivePose';
import PopUp from '../../../utils/popup/Popup';
import ContainerPopupRestau from '../../../utils/conteneurPopup/ContainerPopupRestau';
import axios from 'axios';
import config from '../../../config/config.json';
import { confirmAlert } from 'react-confirm-alert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './Restaurant.css';
import { Greet } from '../../../utils/functions';


export default class Restaurant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurants: [],
            isDetail: false,
            itemSelected: null
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

    deleteRstau = (id) => {
        this.openHidePopup();
        confirmAlert({
            title: 'Bestätigen Sie die Eingabe',
            message: 'Bist du sicher das zu tun?.',
            buttons: [
                {
                    label: 'Ja',
                    onClick: () => axios.put(`${config.urlServer.url}:${config.urlServer.port}/Restaurant/ById`, { idRestaurant: id, Activer: !this.state.itemSelected.Activer })
                        .then((res) =>
                            this.getRestaurant()
                        ).catch((error) => {
                            if (error.response)
                                toast.error(<Greet msg={error.response.data.msg} />)
                            else
                                toast.error(<Greet msg={'Server fehler'} />)
                        })
                },
                {
                    label: 'Nein',
                    onClick: this.openHidePopup()
                }
            ]
        })
    }

    openHidePopup = () => {
        this.setState({ isDetail: !this.state.isDetail });
    }

    selectRestau = (restau) => {
        this.setState({ itemSelected: restau });
    }

    render() {
        const { restaurants, isDetail, itemSelected } = this.state;
        return (
            <div>
                {
                    isDetail &&
                    <PopUp openHidePopup={this.openHidePopup}>
                        <ContainerPopupRestau
                            openHidePopup={this.openHidePopup}
                            itemSelected={itemSelected}
                            deleteRstau={this.deleteRstau}
                        />
                    </PopUp>
                }
                <ActivePose
                    title={'Restaurants'}
                />
                <div className="restaurant__home">
                    <div className="Header__resto">
                        Restaurants
                    </div>
                    <div className="tab__resto">
                        {restaurants.map((rest, key) =>
                            <div className="YesDataRestau"
                                key={key}
                                onClick={(e) => {
                                    e.preventDefault();
                                    this.selectRestau(rest);
                                    this.openHidePopup();
                                }
                                }>
                                <div className="item__res">
                                    {rest.Login}
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
