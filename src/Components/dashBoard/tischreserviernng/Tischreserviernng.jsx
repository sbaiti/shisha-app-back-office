import React from 'react';
import ActivePose from '../../../utils/ActivePose/ActivePose';
import InputText from '../../Common/InputText';
import { Label, Button, Input } from 'reactstrap';
import { findIndex } from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import './Tischreserviernng.css';
import { Greet } from '../../../utils/functions';
import axios from 'axios';
import config from '../../../config/config.json';
import { confirmAlert } from 'react-confirm-alert';
import YesDataReservation from '../hauptseite/yesDataReservation';
import PopUp from '../../../utils/popup/Popup';
import ContainerTischreserviernng from '../../../utils/conteneurPopup/ContainerTischreserviernng';
import 'react-confirm-alert/src/react-confirm-alert.css';
import moment from 'moment';
import {
    NoData, sortByStartDate
} from '../../../utils/functions';
import TimePicker from 'react-times';
import 'react-times/css/material/default.css';

class Tischreserviernng extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nbTable: null,
            nbrPerson: null,
            isOpenDetail: false,
            resv: null,
            dateReservation: null,
            Description: '',
            phoneNumber: '',
            popupOpen: false,
            popupOpenEdit: false,
            reservations: []
        }
    }

    componentWillMount() {
        this.getReservations();
    }

    handleChange = ({ target: { name, value } }) => {
        this.setState({
            [name]: value
        });
    };
    showDetails = () => {
        this.setState({ isOpenDetail: !this.state.isOpenDetail });
    }
    setResSelected = (resv) => {
        this.setState({ resv });
    }

    submitData = () => {
        const { nbTable,
            nbrPerson,
            dateReservation,
            hour,
            minute,
            arrayReservation,
            phoneNumber
        } = this.state;
        if (nbTable <= 1 || nbTable > 80 || !nbTable) {
            toast.error(<Greet msg={'Ungültige Tischnummer'} />);
            return false;
        }
        if (nbrPerson <= 1 || nbrPerson > 40 || !nbrPerson) {
            toast.error(<Greet msg={'ungültige Anzahl von Personen'} />);
            return false;
        }
        if (!dateReservation) {
            toast.error(<Greet msg={'ungültiges Buchungsdatum'} />);
            return false;
        }
        if (!hour || !minute) {
            toast.error(<Greet msg={'ungültige Buchungszeit'} />);
            return false;
        }
        if (phoneNumber === "") {
            toast.error(<Greet msg={'Telefonnummer falsch'} />);
            return false;
        }
        if (findIndex(arrayReservation, ((item) => item.nbTable === nbTable)) !== -1) {
            toast.error(<Greet msg={'Der Tisch ist reserviert !'} />)
            return false;
        }
        return true;
    }

    addReservation = () => {
        let { nbTable,
            nbrPerson,
            dateReservation,
            Description,
            phoneNumber,
            hour,
            minute,
        } = this.state;
        const idRestaurant = localStorage.getItem('idRestaurant');

        const Time = hour + ':' + minute;
        const res = {
            nbTable,
            nbrPerson,
            dateReservation,
            Time,
            Description,
            phoneNumber,
            idRestaurant,
            Confirm: 0
        };

        axios.post(`${config.urlServer.url}:${config.urlServer.port}/Reservation/Add`, res)
            .then((res) => {
            }).catch((error) => {
                if (error.response)
                    toast.error(<Greet msg={error.response.data.msg} />)
                else
                    toast.error(<Greet msg={'Server fehler'} />)
            });
    }
    getReservations = () => {
        const idRestaurant = localStorage.getItem('idRestaurant');
        axios.get(`${config.urlServer.url}:${config.urlServer.port}/Reservation`, { params: { idRestaurant: idRestaurant } })
            .then((res) => {
                const date = moment().format('DD.MM.YYYY');
                this.setState({
                    reservations: res.data.reservation.filter((resv) => moment(resv.dateReservation).format('DD.MM.YYYY') >= date)
                });
            }).catch((error) => {
                if (error.response)
                    toast.error(<Greet msg={error.response.data.msg} />)
                else
                    toast.error(<Greet msg={'Server fehler'} />)
            });
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

    onTimeChange = (options) => {
        const {
            hour,
            minute,
        } = options;
        this.setState({ hour, minute });
    }

    render() {
        const { isOpenDetail, reservations, resv, hour, minute } = this.state;
        const reservationsComfirmed = reservations.filter(resv => resv.Confirm === 1);
        return (
            <div>
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
                <div className="tischreserviernng__home">
                    <ActivePose
                        title={'Tischreservierung Seite'}
                    />
                    <div className="reservation__in__tich">
                        <div className="form__tischreserviernng">
                            <div className="new__reservation">
                                <div className="flex__input">
                                    <Label for="dateReservation" className="label__form">Datum der Reservierung : </Label>
                                    <InputText
                                        id="dateReservation"
                                        name="dateReservation"
                                        type="date"
                                        onChange={this.handleChange}
                                        placeholder="Datum der Reservierung " />
                                </div>
                                <div className="flex__input">
                                    <Label for="Time" className="label__form">Zeit : </Label>
                                    <TimePicker
                                        showTimezone={true}
                                        colorPalette="light"
                                        onTimeChange={this.onTimeChange}
                                        timeMode="24"
                                        meridiem="PM"
                                        time={hour && minute ? `${hour} : ${minute}` : null}
                                        closeOnOutsideClick={true}
                                    />
                                </div>
                                <div className="flex__input">
                                    <Label for="nbTable" className="label__form">Tisch Nummer : </Label>
                                    <InputText
                                        id="nbTable"
                                        name="nbTable"
                                        type="number"
                                        max='80'
                                        onChange={this.handleChange}
                                        placeholder="Tisch Nummer" />
                                </div>
                                <div className="flex__input">
                                    <Label for="nbrPerson" className="label__form">Anzahl der Personen : </Label>
                                    <InputText
                                        id="nbrPerson"
                                        name="nbrPerson"
                                        type="number"
                                        onChange={this.handleChange}
                                        placeholder="Anzahl der Personen" />
                                </div>
                                <div className="flex__input">
                                    <Label for="phoneNumber" className="label__form">Telefonnummer : </Label>
                                    <InputText
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        type="text"
                                        onChange={this.handleChange}
                                        placeholder="Telefonnummer" />
                                </div>
                                <div className="flex__input">
                                    <Label for="Description" className="label__form">Beschreibung : </Label>
                                    <Input
                                        name="Description"
                                        id="Description"
                                        type="textarea"
                                        placeholder="Beschreibung"
                                        onChange={this.handleChange} />
                                </div>
                                <div className="btn__tish">
                                    <center>
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
                                                                    this.addReservation()
                                                                    this.props.resetActiveComponent()
                                                                }
                                                            },
                                                            {
                                                                label: 'Nein'
                                                            }
                                                        ]
                                                    })
                                                }
                                            }}>
                                            <i className="fas fa-check-circle"></i>  {' '}
                                            hinzufügen
                            </Button>
                                    </center>
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
                        <div className="reservation__in__progress">
                            <h2>Tischreservierung in Bearbeitung</h2>
                            {reservationsComfirmed.length >= 1 ?
                                <YesDataReservation
                                    setResSelected={this.setResSelected}
                                    showDetails={this.showDetails}
                                    data={sortByStartDate({ reservation: reservationsComfirmed })} />
                                :
                                <NoData name={'Tischreservierung'} />}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Tischreserviernng;