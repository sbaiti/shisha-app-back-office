import React from 'react';
import ActivePose from '../ActivePose/ActivePose';
import { FormGroup, Input, Button } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import InputText from '../../Components/Common/InputText';
import { Label } from 'reactstrap';
import './Container.css';


import { Greet } from '../functions';

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            dateEvent: null,
            filesAdded: props.data,
            imgSelect: false
        }
    }

    onUploadFile = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        this.setState({
            file,
            imgSelect: true
        }, () => this.addFile());
    }

    addFile() {
        let preview = document.getElementById('event');
        let file = document.querySelector('input[type=file]').files[0];
        let reader = new FileReader()
        reader.addEventListener("load", function () {
            preview.src = reader.result;
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    handleChangeItem = ({ target: { value, name } }) => {
        this.setState({ [name]: value });
    }

    isOkAddFile = () => {
        const { imgSelect, dateEvent } = this.state;
        // if (filesAdded.length > 4) {
        //     toast.error(<Greet msg={'maximal fünf Ereignisse !'} type={true} />);
        //     return false;
        // }
        if (!(imgSelect)) {
            toast.error(<Greet msg={'bitte wählen Sie eine Datei aus !'} type={true} />);
            return false;
        }
        if (dateEvent && (new Date(dateEvent) < new Date())) {
            toast.error(<Greet msg={'ungültiges Buchungsdatum'} />);
            return false;
        }

        return true
    }

    render() {
        const { imgSelect } = this.state;
        return (
            <div className="Popup__container">
                <ActivePose title={this.props.title} />
                <div className="form">
                    <FormGroup>
                        <Input
                            type="file"
                            name="image"
                            ref="attachments"
                            id="exampleFile"
                            multiple
                            accept="image/png, image/jpeg"
                            onChange={this.onUploadFile}
                        >
                        </Input>
                    </FormGroup>
                    <div className="flex__input__date">
                        <Label for="dateEvent" className="label__form">Datum :   </Label>
                        <InputText
                            id="dateEvent"
                            name="dateEvent"
                            type="date"
                            onChange={this.handleChangeItem}
                        />
                    </div>
                    {
                        this.props.type === 'Produckt' &&
                        <div>
                            <div className="flex__input__date">
                                <Label for="nameEvent" className="label__form">Name :   </Label>
                                <InputText
                                    id="nameEvent"
                                    name="nameEvent"
                                    type="text"
                                    onChange={this.handleChangeItem}
                                />
                            </div>
                            <div className="flex__input__date">
                                <Label for="comment" className="label__form">Etikett :   </Label>
                                <InputText
                                    id="comment"
                                    name="comment"
                                    type="text"
                                    onChange={this.handleChangeItem}
                                />
                            </div>
                            <div className="flex__input__date">
                                <Label for="Description" className="label__form">Beschreibung : </Label>
                                <Input
                                    name="Description"
                                    id="Description"
                                    type="textarea"
                                    placeholder="Beschreibung"
                                    onChange={this.handleChangeItem} />
                            </div>
                        </div>}
                    {imgSelect &&
                        <center>
                            <div className="img__uploaded">
                                <img
                                    src="" height="100" width="100" alt="event" id="event" /></div>
                        </center>}
                    <div className="button__popup">
                        <center>
                            <Button
                                color="success"
                                size="lg"
                                onClick={(e) => {
                                    if (this.isOkAddFile()) {
                                        this.props.openHidePopup();
                                        this.props.addEvent({ file: this.state.file, nameEvent: this.state.nameEvent, Description: this.state.Description, dateEvent: this.state.dateEvent });
                                    }
                                }
                                }>
                                <i className="fas fa-check-circle"></i>  {' '}
                                hinzufügen
                        </Button>
                        </center>
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
                </div>
            </div>
        )
    }
}


export default Container;