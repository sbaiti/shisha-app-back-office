import React, { Component } from 'react';
import Header from "./Components/Header/Header";
import SideBar from "./Components/sideBar/Sidebar";
import Login from "./Components/Login/Login";
import { ToastContainer, toast } from 'react-toastify';
//import { routes } from './utils/routes';
import Events from './Components/dashBoard/event/Events';
import Users from './Components/dashBoard/users/Users';
import Angebot from './Components/dashBoard/angebot/Angebot';
import Fussball from './Components/dashBoard/fussball/Fussball';
import Hauptseite from './Components/dashBoard/hauptseite/Hauptseite';
import Stempelkorte from './Components/dashBoard/stempelkorte/Stempelkarte';
import Tischreserviernng from './Components/dashBoard/tischreserviernng/Tischreserviernng';
import Benutzerkonfiguration from './Components/dashBoard/Benutzerkonfiguration/Benutzerkonfiguration';
import Product from './Components/dashBoard/product/Product';
import Admin from './Components/dashBoard/admin/Admin';
import AddAdmin from './Components/dashBoard/AddAdmin/AddAdmin';
import MsgPush from './Components/dashBoard/msgpush/MsgPush';
import Setting from './Components/dashBoard/setting/Setting';
import Restaurant from './Components/dashBoard/restaurant/Restaurant';
import CryptLib from 'cryptlib';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import config from './config/config.json';

import './App.css';


import {
  isSavedDataUser, Greet
} from './utils/functions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      isOkAllService: false,
      activeRoute: { icon: <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />, libelle: "Hauptseite", active: true, component: <Hauptseite /> },
      routes: [
        { icon: <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />, libelle: "Hauptseite", active: true, component: <Hauptseite /> },
        { icon: <i className="fas fa-calendar-day" style={{ fontSize: '1.75em' }} />, libelle: "Event", active: false, component: <Events /> },
        { icon: <i className="fab fa-audible" style={{ fontSize: '1.75em' }} />, libelle: "Angebote", active: false, component: <Angebot /> },
        { icon: <i className="fab fa-product-hunt" style={{ fontSize: '1.75em' }} />, libelle: "Produkte", active: false, component: <Product /> },
        { icon: <i className="fas fa-table" style={{ fontSize: '1.75em' }} />, libelle: "Tischreserviernng", active: false, component: <Tischreserviernng resetActiveComponent={this.resetActiveComponent} /> },
        { icon: <i className="fas fa-comment" style={{ fontSize: '1.75em' }} />, libelle: "Mitteilung", active: false, component: <MsgPush resetActiveComponent={this.resetActiveComponent} /> },
        { icon: <i className="fas fa-users" style={{ fontSize: '1.75em' }} />, libelle: "Kundschaft", active: false, component: <Users /> },
        { icon: <i className="fas fa-stamp" style={{ fontSize: '1.75em' }} />, libelle: "Stempelkarte", active: false, component: <Stempelkorte resetActiveComponent={this.resetActiveComponent} /> },
        { icon: <i className="fas fa-wrench" style={{ fontSize: '1.75em' }} />, libelle: "Rahmen", active: false, component: <Setting onLogOut={this.onLogOut} resetActiveComponent={this.resetActiveComponent} /> },
        { icon: <i className="fas fa-user-cog" style={{ fontSize: '1.75em' }} />, libelle: "Benutzerkonfiguration", active: false, component: <Benutzerkonfiguration resetActiveComponent={this.resetActiveComponent} /> },
        { icon: <i className="fas fa-futbol" style={{ fontSize: '1.75em' }} />, libelle: "Fussball", active: false, component: <Fussball /> }
      ]
    }
  }

  componentDidMount() {
    if (isSavedDataUser()) {
      this.autoLogin();
    }
  }

  onLogin = (user) => {
    this.setState({
      isLogged: true,
      user,
      activeRoute: this.state.routes[0]
    }, () =>
        setTimeout(() => {
          this.setState({ isOkAllService: true })
        }, 1000)
    )
  }
  onLogOut = () => {
    this.setState({
      isLogged: false,
      user: {},
      routes: [
        { icon: <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />, libelle: "Hauptseite", active: true, component: <Hauptseite /> },
        { icon: <i className="fas fa-calendar-day" style={{ fontSize: '1.75em' }} />, libelle: "Event", active: false, component: <Events /> },
        { icon: <i className="fab fa-audible" style={{ fontSize: '1.75em' }} />, libelle: "Angebote", active: false, component: <Angebot /> },
        { icon: <i className="fab fa-product-hunt" style={{ fontSize: '1.75em' }} />, libelle: "Produkte", active: false, component: <Product /> },
        { icon: <i className="fas fa-table" style={{ fontSize: '1.75em' }} />, libelle: "Tischreserviernng", active: false, component: <Tischreserviernng resetActiveComponent={this.resetActiveComponent} /> },
        { icon: <i className="fas fa-comment" style={{ fontSize: '1.75em' }} />, libelle: "Mitteilung", active: false, component: <MsgPush resetActiveComponent={this.resetActiveComponent} /> },
        { icon: <i className="fas fa-users" style={{ fontSize: '1.75em' }} />, libelle: "Kundschaft", active: false, component: <Users /> },
        { icon: <i className="fas fa-stamp" style={{ fontSize: '1.75em' }} />, libelle: "Stempelkarte", active: false, component: <Stempelkorte resetActiveComponent={this.resetActiveComponent} /> },
        { icon: <i className="fas fa-wrench" style={{ fontSize: '1.75em' }} />, libelle: "Rahmen", active: false, component: <Setting onLogOut={this.onLogOut} resetActiveComponent={this.resetActiveComponent} /> },
        { icon: <i className="fas fa-user-cog" style={{ fontSize: '1.75em' }} />, libelle: "Benutzerkonfiguration", active: false, component: <Benutzerkonfiguration resetActiveComponent={this.resetActiveComponent} /> },
        { icon: <i className="fas fa-futbol" style={{ fontSize: '1.75em' }} />, libelle: "Fussball", active: false, component: <Fussball /> }
      ],
      isOkAllService: false
    })
  }

  autoLogin() {
    let Login = localStorage.getItem('saveUserLogin');
    let Role = localStorage.getItem('role');
    let Password = localStorage.getItem('savePassword');
    let userIV = localStorage.getItem('saveUserIV');
    let key = CryptLib.getHashSha256(Login, 32);
    let pw = CryptLib.decrypt(Password, key, userIV);
    this.setServiceUser(Role);
    return this.signIn(Login, pw);
  }

  signIn(username, password) {
    let data = {
      Login: username,
      Password: password
    };

    axios.post(`${config.urlServer.url}:${config.urlServer.port}/UserRestaurant/Login`, data)
      .then((res) => {
        this.onLogin(res.data);
      }
      ).catch((error) => {
        if (error.response)
          toast.error(<Greet msg={error.response.data.msg} />)
        else
          toast.error(<Greet msg={'Serverfehler'} />)
      });
  }

  setActiveItem = (index) => {
    this.state.routes.map((item, key) =>
      (index === key) ? (item.active = true) : (item.active = false)
    );
    this.setState({
      activeRoute: this.state.routes[index]
    });
  }

  resetActiveComponent = () => {
    this.setState({ activeRoute: this.state.routes[0] });
  }

  setServiceUser = (role) => {
    if (role === 'Beabachter')
      this.setState({
        routes: [{ icon: <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />, libelle: "Hauptseite", active: true, component: <Hauptseite /> }]
      });
    if (role === 'superAdmin') {
      this.setState({
        routes: [
          { icon: <i className="fas fa-utensils" style={{ fontSize: '1.75em' }} />, libelle: "Restaurant", active: true, component: <Restaurant /> },
          { icon: <i className="fas fa-unlock-alt" style={{ fontSize: '1.75em' }} />, libelle: "Admin", active: false, component: <Admin /> },
          { icon: <i className="fas fa-user-plus" style={{ fontSize: '1.75em' }} />, libelle: "AddAdmin", active: false, component: <AddAdmin /> }
        ],
        activeRoute: { icon: <i className="fas fa-utensils" style={{ fontSize: '1.75em' }} />, libelle: "Restaurant", active: true, component: <Restaurant /> }
      });
    }
    if (role === 'Mitarbeiter') {
      this.setState({
        routes: this.state.routes.slice(0, 6),
        activeRoute: this.state.routes[0]
      });
    }
  }

  render() {
    const { isLogged, activeRoute, isOkAllService, user } = this.state;
    return (
      <div>
        {!isLogged ?
          (
            <div className="login__page">
              <div className="container">
                <Login onLogin={this.onLogin} setServiceUser={this.setServiceUser} />
              </div>
            </div>
          )
          :
          (
            isOkAllService ?
              <div className="home__page">
                <Header logOut={this.onLogOut} user={user} />
                <div className="container__page">
                  <div className="side__bar">
                    <SideBar setActiveItem={this.setActiveItem} routes={this.state.routes} />
                  </div>
                  <div className="active__component">
                    {activeRoute.component}
                  </div>
                </div>
              </div> :
              <div className="loading__app">
                <Loader
                  type="ThreeDots"
                  color="#00BFFF"
                  height="200"
                  width="200"
                />
              </div>
          )
        }
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
    );
  }
}

export default App;
