import React from 'react';
import { Label, Button } from 'reactstrap';
import './Container.css';

class PopupUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const { user } = this.props;
        return (
            <div className="Container__Tischreserviernng">
                <center><h3>Benutzer detail</h3></center>
                <div className="formm__reservation">
                    <div className="detail__res">
                        <div className="flex__reservation">
                            <Label for="Name" className="label__form__res"> Name Benutzer : :   </Label>
                            <center> <Label for="Name" className="label__form__text">{user.Name}   </Label></center>

                        </div>
                        <div className="flex__reservation">
                            <Label for="Login" className="label__form__res">Anmeldung Benutzer :  </Label>
                            <center>   <Label for="Login" className="label__form__text">{user.Login}   </Label></center>
                        </div>
                        <div className="flex__reservation">
                            <Label for="Password" className="label__form__res">Telefonnummer :   </Label>
                            <center> <Label for="Password" className="label__form__text">{user.Phone}   </Label></center>
                        </div>
                        <div className="flex__reservation">
                            <Label for="Password" className="label__form__res">Rollen :    </Label>
                            <center>   <Label for="Password" className="label__form__text">{user.Role}   </Label></center>
                        </div>
                    </div>
                </div>
                <center>
                    <Button
                        color="danger"
                        size="l"
                        onClick={() => {
                            this.props.deleteUser(this.props.user._id);
                            this.props.setData();
                        }}>
                        <i className="fas fa-ban"></i> {' '}
                        stornieren
            </Button>
                </center>
            </div>
        )
    }
}




export default PopupUser;