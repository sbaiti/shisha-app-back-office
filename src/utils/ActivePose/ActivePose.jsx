import React from 'react';
import posed from 'react-pose';
import './ActivePose.css';

const Box = posed.div({
    hidden: { opacity: 0 },
    visible: { opacity: 50 }
});

class ActivePose extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: true,
            ActivePose: props.title
        };
    }
    componentDidMount() {
        setInterval(() => {
            this.setState({ isVisible: !this.state.isVisible });
        }, 1000);
    }

    render() {
        const { isVisible, ActivePose } = this.state;
        return (
            <div className="active__pose">
                <Box className="box" pose={isVisible ? 'visible' : 'hidden'} >{ActivePose}</Box>
            </div>
        )
    }
}
export default ActivePose;