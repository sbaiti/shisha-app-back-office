import React from 'react';
import config from '../../../config/config.json';
import PopupImg from '../../../utils/popupimg/PopupImg';
import ContainerImg from '../../../utils/conteneurPopup/ContainerImg';
import PopUp from '../../../utils/popup/Popup';
import ContainerTischreserviernng from '../../../utils/conteneurPopup/ContainerTischreserviernng';
import YesDataReservation from './yesDataReservation';
import {
    NoData, sortByStartDate,
    YesData, Greet
} from '../../../utils/functions';
import moment from 'moment';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './Hauptseite.css';



class Hauptseite extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOkData: false,
            isOpenDetail: false,
            resv: null,
            events: [],
            angebots: [],
            produkts: [],
            reservations: [],
            isOpen: false,
            imgSelected: null
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                isOkData: true,
                idRestaurant: localStorage.getItem('idRestaurant')
            }, () => {
                this.getEvents('Event', 'events');
                this.getEvents('Angebot', 'angebots');
                this.getEvents('Product', 'produkts');
                this.getReservations();
            })
        }, 1000);

    }

    getEvents = (type, data) => {
        axios.get(`${config.urlServer.url}:${config.urlServer.port}/File/List`, { params: { idRestaurant: this.state.idRestaurant, Type: type } })
            .then((res) =>
                this.setState({
                    [data]: res.data.file
                })).catch((error) => {
                    if (error.response)
                        toast.error(<Greet msg={error.response.data.msg} />)
                    else
                        toast.error(<Greet msg={'Server fehler'} />)
                });
    }
    getReservations = () => {
        axios.get(`${config.urlServer.url}:${config.urlServer.port}/Reservation`, { params: { idRestaurant: this.state.idRestaurant } })
            .then((res) => {
                const date = moment().format('DD.MM.YYYY');
                this.setState({
                    reservations: res.data.reservation.filter((resv) => moment(resv.dateReservation).format('DD.MM.YYYY') >= date)
                });
            }
            ).catch((error) => {
                if (error.response)
                    toast.error(<Greet msg={error.response.data.msg} />)
                else
                    toast.error(<Greet msg={'Server fehler'} />)
            });
    }

    prepareData = (data) => {
        const array = data.map((item, key) =>
            <img
                src={`${config.urlServer.url}:${config.urlServer.port}/File/Images?image=` + item.Name}
                onClick={(e) => {
                    e.preventDefault();
                    this.imageClick(<img
                        src={`${config.urlServer.url}:${config.urlServer.port}/File/Images?image=` + item.Name}
                        alt='event'
                        width={'400px'}
                        height={'500px'}
                    />, item.nameEvent || '', item.Description || '');
                }}
                alt="event"
                id={key}
                width={'250px'}
                height={'300px'}
            >
            </img>
        );
        return array;
    }

    imageClick = (item, name, des) => {
        this.setState({
            isOpen: !this.state.isOpen,
            imgSelected: item,
            nameSelected: name,
            descreptionSelected: des
        })
    }

    showDetails = () => {
        this.setState({ isOpenDetail: !this.state.isOpenDetail });
    }

    setResSelected = (resv) => {
        this.setState({ resv });
    }

    acceptReservation = (res) => {
        this.showDetails();
        confirmAlert({
            title: 'Bestätigen Sie die Eingabe',
            message: 'Bist du sicher das zu tun?.',
            buttons: [
                {
                    label: 'Ja',
                    onClick: () => axios.put(`${config.urlServer.url}:${config.urlServer.port}/Reservation/Update`, res)
                        .then((res) => {
                            this.getReservations();
                        }).catch((error) => {
                            if (error.response)
                                toast.error(<Greet msg={error.response.data.msg} />)
                            else
                                toast.error(<Greet msg={'Server fehler'} />)
                        })
                },
                {
                    label: 'Nein',
                    onClick: this.showDetails()
                }
            ]
        })

    }

    getUsers = () => {
        axios.get(`${config.urlServer.url}:${config.urlServer.port}/User`, { params: { idRestaurant: this.state.idRestaurant } })
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

    render() {
        const { events, reservations, produkts, resv, isOpen, isOkData, angebots, imgSelected, nameSelected, descreptionSelected, isOpenDetail } = this.state;
        let reservationsComfirmed = (reservations.filter(resv => resv.Confirm === 0) || []);
        return (
            <div>
                {
                    isOpen && (
                        <PopupImg openHidePopup={this.imageClick} >
                            <ContainerImg
                                data={imgSelected}
                                nameEvent={nameSelected}
                                Description={descreptionSelected}
                            />
                        </PopupImg>
                    )
                }
                {
                    isOpenDetail && (
                        <PopUp openHidePopup={this.showDetails} >
                            <ContainerTischreserviernng
                                acceptReservation={this.acceptReservation}
                                resv={resv}
                            />
                        </PopUp>
                    )
                }
                {isOkData ? (
                    <div>
                        <div className="row">
                            <div className="column" >
                                <h2>Aktuelle Events</h2>
                                {events.length >= 1 ?
                                    <YesData data={this.prepareData(events).reverse()} />
                                    :
                                    <NoData name={'Events'} />}
                            </div>
                            <div className="column">
                                <h2>Aktuelle Angebote</h2>
                                {angebots.length >= 1 ?
                                    <YesData data={this.prepareData(angebots).reverse()} />
                                    :
                                    <NoData name={'Angebote'} />}
                            </div>
                        </div>

                        <div className="row">
                            <div className="column">
                                <h2>Aktuelle Produkte</h2>
                                {produkts.length >= 1 ?
                                    <YesData data={this.prepareData(produkts).reverse()} />
                                    :
                                    <NoData name={'Produkt'} />}
                            </div>
                            <div className="column" >
                                <h2>Aktuelle Techreservierung</h2>
                                {reservationsComfirmed.length >= 1 ?
                                    <YesDataReservation
                                        css={true}
                                        setResSelected={this.setResSelected}
                                        showDetails={this.showDetails}
                                        data={sortByStartDate({ reservation: reservationsComfirmed })} />
                                    :
                                    <NoData name={'Teschreservierung'} />}
                            </div>
                        </div>
                    </div>)
                    :
                    <div className="loading">
                        <Loader
                            type="ThreeDots"
                            color="#00BFFF"
                            height="200"
                            width="200"
                        />
                    </div>
                }
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
export default Hauptseite;