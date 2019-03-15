import React from 'react';
import { Label, Button } from 'reactstrap';
import './Container.css';

const ContainerPopupRestau = (props) => {
    return (
        <div className="Container__Tischreserviernng__selected">
            <center><h1>Restaurant detail</h1></center>
            <div className="formm__reservation">
                <div className="detail__res">
                    <div className="flex__reservation">
                        <Label for="Name" className="label__form__res"> Name Restaurant :   </Label>
                        <center> <Label for="Name" className="label__form__text__selected">{props.itemSelected.Name}   </Label></center>

                    </div>
                    <div className="flex__reservation">
                        <Label for="Login" className="label__form__res">Login :   </Label>
                        <center>   <Label for="Login" className="label__form__text__selected">{props.itemSelected.Login}   </Label></center>

                    </div>
                    <div className="flex__reservation">
                        <Label for="Role" className="label__form__res">Role :   </Label>
                        <center> <Label for="Role" className="label__form__text__selected">{props.itemSelected.Role}   </Label></center>
                    </div>
                    <div className="flex__reservation">
                        <Label for="Activer" className="label__form__res">Status :   </Label>
                        <center> <Label for="Activer" className="label__form__text__selected">{String(props.itemSelected.Activer)}   </Label></center>
                    </div>
                </div>
            </div>
            <div className="btn__delete__restau">
                <Button
                    color="primary"
                    size="l"
                    onClick={(e) => {
                        e.preventDefault();
                        props.deleteRstau(props.itemSelected._id);
                    }}>
                    <i className="fas fa-ban"></i> {' '}
                    Update Status
            </Button>
            </div>
        </div>
    )
}
export default ContainerPopupRestau;