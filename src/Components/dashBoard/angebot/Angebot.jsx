import React from 'react';
import ActivePose from '../../../utils/ActivePose/ActivePose';
import Button from '../../../utils/button/Button';
import TabItem from '../../../utils/TabItem/TabItem';
import PopUp from '../../../utils/popup/Popup';
import Container from '../../../utils/conteneurPopup/Container';
import ContainerDeleteEvent from '../../../utils/conteneurPopup/ContainerDeleteEvent';
import axios from 'axios';
import PopupImg from '../../../utils/popupimg/PopupImg';
import { ToastContainer, toast } from 'react-toastify';
import config from '../../../config/config.json';

import './Angebot.css';

import { Greet } from '../../../utils/functions';



class Angebot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'Angebote',
            options: { noDataText: 'kein angebot' },
            data: [],
            isOpen: false,
            heigth: '490px',
            isSelected: false,
            imgDeleted: {
                id: null,
                key: null
            }
        }
    }


    /*life  cycle component*/
    componentDidMount() {
        this.getEvents();
    }

    /* functions */

    addAngebot = (obj) => {
        const formData = new FormData();
        formData.append('image', obj.file);
        const id = localStorage.getItem('idRestaurant');
        formData.append('idRestaurant', id);
        formData.append('Type', 'Angebot');
        formData.append('dateEvent', obj.dateEvent);
        formData.append('Description', obj.Description);
        formData.append('nameEvent', obj.nameEvent);
        const configRequest = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post(`${config.urlServer.url}:${config.urlServer.port}/File/Photos`, formData, configRequest)
            .then((response) => {
                this.getEvents();
            }
            ).catch((error) => {
                if (error.response)
                    toast.error(<Greet msg={error.response.data.msg} />)
                else
                    toast.error(<Greet msg={'Server fehler'} />)
            });

    }

    deleteAngebot = (id) => {
        axios.put(`${config.urlServer.url}:${config.urlServer.port}/File/delete`, { id, Type: 'Angebot' }).then((res) => {
            this.getEvents();
        }).catch((error) => {
            if (error.response)
                toast.error(<Greet msg={error.response.data.msg} />)
            else
                toast.error(<Greet msg={'Server fehler'} />)
        });
    }


    deleteAllAngebots = () => {
        const idRestaurant = localStorage.getItem('idRestaurant');
        axios.put(`${config.urlServer.url}:${config.urlServer.port}/File/deleteAll`, { idRestaurant, Type: 'Angebot' }).then((res) => {
            this.getEvents();
        }).catch((error) => {
            if (error.response)
                toast.error(<Greet msg={error.response.data.msg} />)
            else
                toast.error(<Greet msg={'Server fehler'} />)
        });
    }

    imageClick = (id, key) => {
        this.setState({
            isSelected: !this.state.isSelected,
            imgDeleted: {
                id,
                key
            }
        });
    }

    openHidePopup = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    getEvents = () => {
        const idRestaurant = localStorage.getItem('idRestaurant');
        axios.get(`${config.urlServer.url}:${config.urlServer.port}/File/List`, { params: { idRestaurant: idRestaurant, Type: 'Angebot' } })
            .then((res) => this.setState({
                data: res.data.file.reverse()
            })).catch((error) => {
                if (error.response)
                    toast.error(<Greet msg={error.response.data.msg} />)
                else
                    toast.error(<Greet msg={'Server fehler'} />)
            });
    }

    render() {
        const { isOpen, data, heigth, isSelected, imgDeleted } = this.state;
        const events = data.map((item, key) =>
            <img
                src={`${config.urlServer.url}:${config.urlServer.port}/File/Images?image=` + item.Name}
                alt="event"
                height="390"
                width="225"
                id={item._id}>
            </img>
        );
        return (
            <div className="angebot__home">
                {
                    isOpen && (
                        <PopUp openHidePopup={this.openHidePopup} >
                            <Container
                                data={data}
                                type={'Angebote'}
                                addEvent={this.addAngebot}
                                openHidePopup={this.openHidePopup}
                                title={'Neues Angebote'}
                            />
                        </PopUp>
                    )
                }
                {isSelected &&
                    <PopupImg openHidePopup={this.imageClick}>
                        <ContainerDeleteEvent
                            openHidePopup={this.imageClick}
                            imgDeleted={imgDeleted}
                            deleteEvent={this.deleteAngebot}
                            events={events}
                            data={data}
                            addEvent={this.addAngebot}
                        />
                    </PopupImg>
                }
                <ActivePose
                    title={'Angebote Seite'}
                />
                <Button
                    deleteAllEvents={this.deleteAllAngebots}
                    openHidePopup={this.openHidePopup} />
                {data.length >= 1 &&
                    <TabItem {...this.state}
                        events={events}
                        heigth={heigth}
                        imageClick={this.imageClick}
                        deleteEvent={this.deleteAngebot} />}
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


export default Angebot;