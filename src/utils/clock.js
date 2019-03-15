import React from 'react';

import Moment from 'moment';

class Clock extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: "",
            time: ""
        };
    }

    componentDidMount() {
        this.setTime();
        setInterval(this.setTime.bind(this), 5000);
    }

    setTime() {
        let newTime;
        let newDate;

        let date = Moment(new Date());
        let time = new Date();
        let hours = time.getHours();
        let minutes = time.getMinutes();

        newTime = ((hours < 10) ? ' ' : '') + hours
            + ':' + ((minutes < 10) ? '0' : '') + minutes;

        newDate = date.format("L LT");

        this.setState({
            date: newDate,
            time: newTime
        });
    }

    render() {
        return (
            <div className="clock">
                {this.props.showDate ? this.state.date : ""}
                {this.props.showTime ? this.state.time : ""}
            </div>
        );
    }
}

export default Clock;