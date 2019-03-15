import React from 'react';
import { Input, Label, Button } from 'reactstrap';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import { Greet } from '../functions';
import './Container.css';

class ContainerTischreserviernng extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reservation: {},
            nbTable: null
        }
    }
    handleChange = ({ target: { value, name } }) => {
        this.setState({ [name]: value }, () => {
            const newRes = this.props.resv;
            const { nbTable } = this.state;
            this.setState({
                reservation:
                {
                    ...newRes,
                    Confirm: 0,
                    nbTable: Number(nbTable)
                }
            })
        });
    }

    submitData = () => {
        if (!this.state.nbTable || this.state.nbTable > 80) {
            toast.error(<Greet msg={'Ungültige Tischnummer'} />);
            return false;
        }
        return true;
    }

    render() {
        const { resv } = this.props;
        const { reservation } = this.state;
        const role = localStorage.getItem('role');
        return (
            <div className={`Container__Tischreserviernng${resv.nbTable ? '__selected' : ''}`}>
                <center><h3>Reservierungsdetail</h3></center>
                <div className="formm__reservation">
                    <div className="detail__res">
                        <div className="flex__reservation">
                            <Label for="Name" className="label__form__res"> Datum der Reservierung :   </Label>
                            <center> <Label for="Name" className={`label__form__text${resv.nbTable ? '__selected' : ''}`}>{moment(resv.dateReservation).format('DD.MM.YYYY')}   </Label></center>

                        </div>
                        <div className="flex__reservation">
                            <Label for="Login" className="label__form__res">Zeit :   </Label>
                            <center>   <Label for="Login" className={`label__form__text${resv.nbTable ? '__selected' : ''}`}>{resv.Time}   </Label></center>

                        </div>
                        <div className="flex__reservation">
                            <Label for="Password" className="label__form__res">Telefonnummer :   </Label>
                            <center> <Label for="Password" className={`label__form__text${resv.nbTable ? '__selected' : ''}`}>{resv.phoneNumber}   </Label></center>
                        </div>
                        <div className="flex__reservation">
                            <Label for="Password" className="label__form__res">Anzahl der Personen :   </Label>
                            <center>   <Label for="Password" className={`label__form__text${resv.nbTable ? '__selected' : ''}`}>{resv.nbrPerson}   </Label></center>
                        </div>
                        {!resv.nbTable && <div className="flex__reservation">
                            <Label for="Password" className="label__form__res">Beschreibung :   </Label>
                            <center>   <Label for="Password" className={`label__form__text${resv.nbTable ? '__selected' : ''}`}>{resv.Description}   </Label></center>
                        </div>}
                        <div className="flex__reservation">
                            <Label for="Password" className="label__form__res">Tisch Nummer :   </Label>
                            {resv.nbTable ?
                                <center><Label for="nbTable" className={`label__form__text${resv.nbTable ? '__selected' : ''}`}>{resv.nbTable}   </Label></center> :
                                <center>
                                    <Input
                                        id="nbTable"
                                        name="nbTable"
                                        type="number"
                                        max='80'
                                        className='input__tab'
                                        onChange={this.handleChange}
                                        placeholder="Tish Nummer" />
                                </center>

                            }
                        </div>
                    </div>
                </div>
                {(role !== 'Beabachter') && (!resv.nbTable ? <div className="btn__sub">
                    <center>
                        <Button
                            color="success"
                            size="l"
                            onClick={(e) => {
                                e.preventDefault();
                                if (this.submitData()) {
                                    this.props.acceptReservation(reservation);
                                }
                            }}>
                            <i className="fas fa-check-circle"></i>  {' '}
                            Vorlegen
                            </Button>
                        <Button
                            color="danger"
                            size="l"
                            onClick={(e) => {
                                e.preventDefault();
                                this.props.acceptReservation({ ...this.props.resv, Confirm: 2 });
                            }}>
                            <i className="fas fa-ban"></i> {' '}
                            stornieren
            </Button>
                    </center>
                </div> :
                    <div className="btn__sub">
                        <center>
                            <Button
                                color="danger"
                                size="l"
                                onClick={(e) => {
                                    e.preventDefault();
                                    this.props.acceptReservation({ ...this.props.resv, Confirm: 2 });
                                }
                                }>
                                <i className="fas fa-ban"></i> {' '}
                                stornieren
                     </Button></center></div>)}
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




export default ContainerTischreserviernng;