import React from 'react';
import Events from '../Components/dashBoard/event/Events';
import Angebot from '../Components/dashBoard/angebot/Angebot';
import Fussball from '../Components/dashBoard/fussball/Fussball';
import Hauptseite from '../Components/dashBoard/hauptseite/Hauptseite';
import Stempelkorte from '../Components/dashBoard/stempelkorte/Stempelkarte';
import Tischreserviernng from '../Components/dashBoard/tischreserviernng/Tischreserviernng';
import Product from '../Components/dashBoard/product/Product';
import Admin from '../Components/dashBoard/admin/Admin';
import Restaurant from '../Components/dashBoard/restaurant/Restaurant';

const routes = [
    { libelle: "Hauptseite", active: true, path: "/hauptseite", iconClass: "fas fa-tachometer-alt fa-lg", component: <Hauptseite /> },
    { libelle: "Events", active: false, path: "/event", iconClass: "fas fa-thumbtack fa-lg", component: <Events /> },
    { libelle: "Angebot", active: false, path: "/angebot", iconClass: "fas fa-images fa-lg", component: <Angebot /> },
    { libelle: "Tischreserviernng", active: false, path: "/tischreserviernng", iconClass: "fas fa-file-alt", component: <Tischreserviernng /> },
    { libelle: "Stempelkorte", active: false, path: "/stempelkorte", iconClass: "fas fa-comment-alt", component: <Stempelkorte /> },
    { libelle: "Fussball", active: false, path: "/fussball", iconClass: "fas fa-comment-alt", component: <Fussball /> },
    { libelle: "Product", active: false, path: "/produckt", iconClass: "fas fa-comment-alt", component: <Product /> },
    { libelle: "Admin", active: false, path: "/admin", iconClass: "fas fa-comment-alt", component: <Admin /> },
    { libelle: "Restaurant", active: false, path: "/Restaurant", iconClass: "fas fa-comment-alt", component: <Restaurant /> }

];

export { routes };