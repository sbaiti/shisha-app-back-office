import React from 'react';
import { AwesomeButton } from 'react-awesome-button';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './Container.css';

class ContainerDeleteEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            noEvent: true
        }
    }
    changeView = () => {
        this.setState({
            noEvent: !this.state.noEvent
        })
    }

    render() {
        const { events } = this.props;
        const { key, id } = this.props.imgDeleted;
        const { noEvent } = this.state;
        return (
            <div>
                {noEvent && <div className="Container__DeleteEvent">
                    <div> {events[key]} </div>
                    <div className="btn__del">
                        <AwesomeButton
                            action={() => {
                                this.props.openHidePopup();
                                confirmAlert({
                                    title: 'Bestätigen Sie die Eingabe',
                                    message: 'Bist du sicher das zu tun?.',
                                    buttons: [
                                        {
                                            label: 'Ja',
                                            onClick: () => {
                                                this.props.deleteEvent(id);
                                            }
                                        },
                                        {
                                            label: 'Nein'
                                        }
                                    ]
                                })

                            }}
                        >
                            <i className="fas fa-trash-alt"></i> {' '}
                            löschen
                            </AwesomeButton></div>
                </div>}
            </div>
        )
    }
}

export default ContainerDeleteEvent;