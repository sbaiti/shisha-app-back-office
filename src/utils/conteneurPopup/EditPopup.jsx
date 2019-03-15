import React from 'react';
import { Label, Input } from 'reactstrap';
import { AwesomeButton } from 'react-awesome-button';
import InputText from '../../Components/Common/InputText';

import './Container.css';

class EditPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null,
            index: null
        }
    }
    handleSelectChange = ({ target: { value } }) => {
        const index = this.props.data.findIndex(({ nbTable }) => nbTable === value);
        this.setState({
            selectedTable: Number(value),
            tableToUpdate: this.props.data[index],
            index
        });
    }
    handleChange = (e) => {
        this.setState({ selected: e.target.value });
    }

    handleChangeItem = ({ target: { name, value } }) => {
        this.setState({ [name]: value });
    }
    render() {
        const { selected, tableToUpdate, index } = this.state;
        return (
            <div className="Container__Tischreserviernng__edit">
                <Label for="exampleSelect">Wählen</Label>
                <div className="form__del">
                    <Input
                        type="select"
                        name="select"
                        id="exampleSelect"
                        onChange={this.handleSelectChange}  >
                        {this.props.data.map((item, key) => (

                            <option id={key} >{item.nbTable}</option>
                        ))
                        }
                    </Input>
                </div>

                {index && (
                    <div>
                        <div className="flex__input">
                            <Label for="nbPerson" className="label__form">Anzahl der Personen : </Label>
                            <InputText
                                id="nbPerson"
                                name="nbPerson"
                                type="number"
                                value={Number(tableToUpdate.nbPerson)}
                                onChange={this.handleChangeItem}
                            />
                        </div>
                        <div className="flex__input">
                            <Label for="dateReservation" className="label__form">Datum der Reservierung : </Label>
                            <InputText
                                id="dateReservation"
                                name="dateReservation"
                                type="date"
                                value={new Date(tableToUpdate.dateReservation)}
                                onChange={this.handleChangeItem}
                            />
                        </div>
                        <div className="flex__input">
                            <Label for="hourReservation" className="label__form">Stunde : </Label>
                            <InputText
                                id="hourReservation"
                                name="hourReservation"
                                type="time"
                                value={tableToUpdate.hourReservation}
                                onChange={this.handleChangeItem}
                            />

                        </div>
                        <div className="button__edit">
                            <AwesomeButton
                                action={() => {
                                    if (selected) {
                                        this.props.openHidePopup();
                                        this.props.deleteReservation(selected);
                                    }
                                }}
                            >
                                <i class="fas fa-check"></i>
                            </AwesomeButton>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}




export default EditPopup;