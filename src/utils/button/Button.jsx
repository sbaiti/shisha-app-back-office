import React from 'react';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './Button.css';




class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    addItem = () => {
        this.props.openHidePopup();
    }
    render() {
        return (
            <div className="button">
                <div className="button__left">
                    <AwesomeButton
                        action={() => this.addItem('aaaaaaa')}
                    >
                        <i className="fas fa-calendar-plus"></i>  {' '}
                        Hinzufügen
            </AwesomeButton>
                </div>
                <div className="button__left">
                    <AwesomeButton
                        action={() =>
                            confirmAlert({
                                title: 'Bestätigen Sie die Eingabe',
                                message: 'Bist du sicher das zu tun?.',
                                buttons: [
                                    {
                                        label: 'Ja',
                                        onClick: () => this.props.deleteAllEvents()
                                    },
                                    {
                                        label: 'Nein'
                                    }
                                ]
                            })




                        }
                    >
                        <i className="fas fa-trash-alt"></i> {' '}
                        Alles Löschen
            </AwesomeButton>
                </div>
            </div>
        )
    }
}


export default Button;