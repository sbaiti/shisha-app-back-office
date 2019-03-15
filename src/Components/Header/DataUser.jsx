import React from 'react';
import { Label, Button } from 'reactstrap';



const DateUser = (props) => {
    return (
        <div className="info__user">
            <div className="info__user__cadr">
                <div className="flex__reservation">
                    <Label for="Login" className="label__form__res">Name :   </Label>
                    <center>   <Label for="Rollen" >{props.user && props.user.Name ? props.user.Name : localStorage.getItem('Name')}   </Label></center>
                </div>
                <div className="flex__reservation">
                    <Label for="Login" className="label__form__res">Anmeldung :   </Label>
                    <center>   <Label for="Rollen" >{props.user && props.user.Login ? props.user.Login : localStorage.getItem('saveUserLogin')}   </Label></center>
                </div>
                <div className="flex__reservation">
                    <Label for="Login" className="label__form__res">Rollen :   </Label>
                    <center>   <Label for="Rollen" >{props.user ? props.user.Role : localStorage.getItem('role')}   </Label></center>
                </div>
                <div className="btn__log__out">
                    <Button onClick={() => { props.logOut(); props.resetUser() }}
                        color="danger">
                        Ausloggen</Button>
                </div>
            </div>
        </div>
    )
}


export default DateUser; 