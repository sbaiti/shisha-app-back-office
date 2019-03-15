import React from 'react';
import ActivePose from '../../../utils/ActivePose/ActivePose';
import Button from '../../../utils/button/Button';
import TabItem from '../../../utils/TabItem/TabItem';
import PopUp from '../../../utils/popup/Popup';
import PopupImg from '../../../utils/popupimg/PopupImg';
import Container from '../../../utils/conteneurPopup/Container';
import ContainerDeleteEvent from '../../../utils/conteneurPopup/ContainerDeleteEvent';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import config from '../../../config/config.json';
import { Greet } from '../../../utils/functions';

import './Product.css';


class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'Produkte',
            options: { noDataText: 'kein Produkt' },
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

    /* life  cycle component */

    componentDidMount() {
        this.getEvents();
    }

    /* functions */

    addProdukt = (obj) => {
        const formData = new FormData();
        formData.append('image', obj.file);
        const id = localStorage.getItem('idRestaurant');
        formData.append('Type', 'Product');
        formData.append('idRestaurant', id);
        formData.append('dateEvent', obj.dateEvent);
        formData.append('Description', obj.Description);
        formData.append('nameEvent', obj.nameEvent);
        const configData = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post(`${config.urlServer.url}:${config.urlServer.port}/File/Photos`, formData, configData)
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

    deleteProdukt = (id) => {
        axios.put(`${config.urlServer.url}:${config.urlServer.port}/File/delete`, { id, Type: 'Product' })
            .then((res) => {
                this.getEvents();
                toast.success(<Greet msg={'gelöscht !'} />);
            }).catch((error) => {
                if (error.response)
                    toast.error(<Greet msg={error.response.data.msg} />)
                else
                    toast.error(<Greet msg={'Server fehler'} />)
            });
    }

    deleteAllProdukts = () => {
        const idRestaurant = localStorage.getItem('idRestaurant');
        axios.put(`${config.urlServer.url}:${config.urlServer.port}/File/deleteAll`, { idRestaurant, Type: 'Product' })
            .then((res) => {
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
        axios.get(`${config.urlServer.url}:${config.urlServer.port}/File/List`, { params: { idRestaurant: idRestaurant, Type: 'Product' } })
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
            <div className="product__home" >
                {
                    isOpen && (
                        <PopUp openHidePopup={this.openHidePopup} >
                            <Container
                                type={'Produckt'}
                                data={data}
                                addEvent={this.addProdukt}
                                openHidePopup={this.openHidePopup}
                                title={'Neues Ereignis'}
                            />
                        </PopUp>
                    )
                }
                {isSelected &&
                    <PopupImg openHidePopup={this.imageClick}>
                        <ContainerDeleteEvent
                            openHidePopup={this.imageClick}
                            imgDeleted={imgDeleted}
                            deleteEvent={this.deleteProdukt}
                            events={events}
                            data={data}
                            addEvent={this.addProdukt}
                        />
                    </PopupImg>
                }
                <ActivePose
                    title={'Produkte Seite'}
                />
                <Button
                    deleteAllEvents={this.deleteAllProdukts}
                    openHidePopup={this.openHidePopup} />
                {data.length >= 1 &&
                    <TabItem {...this.state}
                        events={events}
                        heigth={heigth}
                        imageClick={this.imageClick}
                        deleteEvent={this.deleteProdukt} />}
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
export default Product;