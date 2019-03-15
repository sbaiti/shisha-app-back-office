import React from 'react';
import {
    Navbar, Collapse, Nav, NavItem, NavLink
} from 'reactstrap';
import { ButtonGroup } from 'react-bootstrap';
import FullscreenUtil from '../../utils/FullscreenUtil';
import Clock from '../../utils/clock';
import './Header.css';
import axios from 'axios';
import config from '../../config/config.json';
import { resetUser } from '../../utils/functions';
import DateUser from './DataUser';



class Header extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            show: false,
            isActive: false,
            isOkLogo: false,
            src: '',
            user: ''
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.getSrcLogo();
        }, 1000);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    getSrcLogo = () => {
        const idRestaurant = localStorage.getItem('idRestaurant');
        const saveUsername = localStorage.getItem('saveUserLogin');
        axios.get(`${config.urlServer.url}:${config.urlServer.port}/File/List`, { params: { idRestaurant: idRestaurant, Type: 'Logo' } })
            .then((res) => {
                if (res.data.file.length >= 1)
                    this.setState({
                        src: res.data.file,
                        isOkLogo: true,
                        user: saveUsername
                    });
                else {
                    this.setState({ user: saveUsername })
                }
            })
            .catch((error) => console.log('error', error));
    }


    setScreen = () => {
        this.setState({ isActive: !this.state.isActive });
        FullscreenUtil.toggle();
    }

    toggleHeader = () => {
        if (!this.state.show) {
            document.addEventListener('click', this.handleOutsideClick, false);
        } else {
            document.removeEventListener('click', this.handleOutsideClick, false);
        }
        this.setState({ show: !this.state.show });
    }

    handleOutsideClick = (e) => {
        if (this.node && this.node.contains(e.target)) {
            return;
        }
        if (this.state.show) {
            this.toggleHeader();
        }
    }

    render() {
        const { isOkLogo, isActive, show } = this.state;
        let welcomeText;
        let welcome = 'Willkommen';
        if (this.state.user) {
            welcomeText = welcome + ' ' + this.state.user + ' ';
        }
        //<img src={require('../../assets/Logo-dark.png')} alt='logo' />
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <div className="site-logo">
                        {isOkLogo &&
                            <img src={`${config.urlServer.url}:${config.urlServer.port}/File/Images?image=` + this.state.src[0].Name}
                                alt='logo' />
                        }
                    </div>
                    <Collapse isOpen={this.state.isOpen} navbar className="mx-5 ">
                        <Nav className="ml-auto" navbar>
                            <NavItem className="Welcome">
                                <NavLink>
                                    {welcomeText}
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink >
                                    <ButtonGroup>
                                        <button onClick={this.toggleHeader}
                                            className="overlay-button">
                                            <i className="fas fa-info"></i>
                                        </button>
                                        <button onClick={this.setScreen} className="fullscreen-button">
                                            {isActive ? <i className="fas fa-compress-arrows-alt"></i> : <i className="fas fa-expand-arrows-alt"></i>}

                                        </button>
                                    </ButtonGroup>
                                    {show && (<div className="date__filter__wrapperr" ref={node => { this.node = node; }}>
                                        <div className="arrow__uppp" />
                                        <DateUser user={this.props.user} resetUser={resetUser} logOut={this.props.logOut} />
                                    </div>)}
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink>
                                    <Clock showDate={false} showTime={true} />
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>

        );
    }


}
export default Header;
