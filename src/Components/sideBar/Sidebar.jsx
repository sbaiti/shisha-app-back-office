import React from 'react';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { findIndex } from 'lodash';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './Sidebar.css';


const SideBar = (props) => {
    return (
        <SideNav
            onSelect={(selected) => {
                const index = findIndex(props.routes, (route) => (route.libelle).toUpperCase() === selected.toUpperCase());
                props.setActiveItem(index);
            }}
        >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected={props.routes[0].libelle}>
                {props.routes.map((route,key) =>
                    <NavItem eventKey={route.libelle} key={key}>
                        <NavIcon>
                            {route.icon}
                        </NavIcon>
                        <NavText>
                            {route.libelle}
                        </NavText>
                    </NavItem>
                )}
            </SideNav.Nav>
        </SideNav>
    )
}

export default SideBar;