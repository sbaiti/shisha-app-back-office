import React from 'react';
import { Button } from 'reactstrap';
import Calendar from 'react-calendar';
import moment from 'moment';
import './Hauptseite.css';
import {
    filterDataByStartEndDate
} from '../../../utils/functions';

class YesDataReservation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isStart: false,
            isEnd: false,
            isOpenDetail: false,
            dateStart: null,
            dateEnd: null,
            data: this.props.data
        }
    }

    handleChangeStart = (date) => {
        this.setState({
            isStart: !this.state.isStart,
            dateStart: moment(date).format('DD.MM.YYYY'),
            dateCalendarStart: date
        }, () =>
                this.setState({ data: (filterDataByStartEndDate(this.props.data, this.state.dateStart, this.state.dateEnd)) })
        )
    }
    handleChangeEnd = (date) => {
        date.setHours(0, 0, 0, 0);
        this.setState({
            isEnd: !this.state.isEnd,
            dateEnd: moment(date).format('DD.MM.YYYY'),
            dateCalendarEnd: date
        }, () =>
                this.setState({ data: (filterDataByStartEndDate(this.props.data, this.state.dateStart, this.state.dateEnd)) })
        )
    }

    handleToggleFilterStart = () => {
        if (!this.state.isStart) {
            document.addEventListener('click', this.handleOutsideClick, false);
        } else {
            document.removeEventListener('click', this.handleOutsideClick, false);
        }

        this.setState({
            isStart: !this.state.isStart,
            isEnd: false
        });
    }
    handleToggleFilterEnd = () => {
        if (!this.state.isEnd) {
            document.addEventListener('click', this.handleOutsideClick, false);
        } else {
            document.removeEventListener('click', this.handleOutsideClick, false);
        }

        this.setState(({
            isEnd
        }) => ({
            isStart: false,
            isEnd: !isEnd
        }));
    }


    handleOutsideClick = (e) => {
        if (this.node && this.node.contains(e.target)) {
            return;
        }
        if (this.state.isStart) {
            this.handleToggleFilterStart();
        }
        if (this.state.isEnd) {
            this.handleToggleFilterEnd();
        }
    }

    render() {
        const { isStart, isEnd } = this.state;
        return (
            <div>
                <div className={this.props.css ? 'reservation' : 'reservation__tisch'} ref={node => { this.node = node; }}>
                    <div className="YesDataResrvation__tab">
                        <div className="item__res__btn">
                            <Button
                                color="primary"
                                size="sm"
                                onClick={(e) => {
                                    e.preventDefault();
                                    this.handleToggleFilterStart();
                                }}>
                                <i className="fas fa-hourglass-start"></i>  {' '}
                                Starten
        </Button>
                            {isStart && (<div className="date__filter__wrapperr" ref={node => { this.node = node; }}>
                                <div className="arrow__upp" />
                                <Calendar
                                    inline
                                    className="calendar"
                                    isClearable={true}
                                    value={this.state.dateCalendarStart}
                                    onChange={this.handleChangeStart}
                                />
                                <center>
                                    <Button
                                        color="primary"
                                        size="sm"
                                        onClick={() => {
                                            this.setState({ dateStart: null, isStart: !this.state.isStart }, () =>
                                                this.setState({ data: (filterDataByStartEndDate(this.props.data, this.state.dateStart, this.state.dateEnd)) })
                                            );
                                        }}
                                    >
                                        rücksetzen
    </Button>
                                </center>
                            </div>)}
                        </div>
                        <div className="item__res">
                            <Button
                                color="primary"
                                size="sm"
                                onClick={(e) => {
                                    e.preventDefault();
                                    this.handleToggleFilterEnd();
                                }}>
                                <i className="fas fa-hourglass-start"></i>  {' '}
                                Ende
</Button>
                            {isEnd && (<div className="date__filter__wrapperr" ref={node => { this.node = node; }}>
                                <div className="arrow__upp" />
                                <Calendar
                                    inline
                                    className="calendar"
                                    isClearable={true}
                                    value={this.state.dateCalendarEnd}
                                    onChange={this.handleChangeEnd}
                                />
                                <center>
                                    <Button
                                        color="primary"
                                        size="small"
                                        onClick={() => {
                                            this.setState({ dateEnd: null, isEnd: !this.state.isEnd }, () =>
                                                this.setState({ data: (filterDataByStartEndDate(this.props.data, this.state.dateStart, this.state.dateEnd)) }));
                                        }}
                                    >
                                        rücksetzen
    </Button>
                                </center>
                            </div>)}
                        </div>
                    </div>
                    <div className="YesDataResrvation__tab">
                        <div className="item__res">
                            Tisch nummer
                </div>
                        <div className="item__res">
                            Datum
                </div>
                        <div className="item__res">
                            Zeit
                </div>
                    </div>
                    <div className="ctn__res">
                        {this.state.data.map((resv, key) =>
                            <div className="YesDataResrvation"
                                key={key}
                                onClick={(e) => {
                                    e.preventDefault();
                                    this.props.showDetails();
                                    this.props.setResSelected(resv);
                                }
                                }>
                                <div className="item__res">
                                    {(resv.Confirm === 0) ? resv.nbTable : 'keiner'}
                                </div>
                                <div className="item__res">
                                    {moment(resv.dateReservation).format('DD.MM.YYYY')}
                                </div>
                                <div className="item__res">
                                    {resv.Time}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default YesDataReservation;