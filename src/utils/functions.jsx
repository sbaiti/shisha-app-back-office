import React from 'react';
import CryptLib from 'cryptlib';
import ActivePose from './ActivePose/ActivePose';
import { compareAsc, compareDesc } from 'date-fns';
import moment from 'moment';
import { filter } from 'lodash';
import './utils.css';


function saveUserdata(user) {
    localStorage.setItem('saveUserLogin', user.Login);
    localStorage.setItem('Name', user.Name);

    let iv = CryptLib.generateRandomIV(16); //16 bytes = 128 bit
    let key = CryptLib.getHashSha256(user.Login, 32);
    let encryptedText = CryptLib.encrypt(user.Password, key, iv);
    localStorage.setItem('savePassword', encryptedText);
    localStorage.setItem('saveUserToken', user.token);
    localStorage.setItem('idRestaurant', user.idRestaurant);
    localStorage.setItem('role', user.role);
    localStorage.setItem('idUser', user.idUser);
    localStorage.setItem('saveUserIV', iv);
}
function saveUserIdRestaurant(user) {
    localStorage.setItem('saveUserLogin', user.Login);
    localStorage.setItem('idUser', user.idUser);
    localStorage.setItem('Name', user.Name);
    localStorage.setItem('idRestaurant', user.idRestaurant);
    localStorage.setItem('role', user.role);
}

function isSavedDataUser() {
    let Login = localStorage.getItem('saveUserLogin');
    if (Login == null || Login === "null") {
        return false;
    }
    let password = localStorage.getItem('savePassword');
    if (password === "null" || password == null) {
        return false;
    }
    let Name = localStorage.getItem('Name');
    if (Name === "null" || Name == null) {
        return false;
    }
    let userIV = localStorage.getItem('saveUserIV');
    if (userIV === "null" || userIV == null) {
        return false;
    }
    return true;
}

function resetUser() {
    localStorage.setItem('saveUserIV', null);
    localStorage.setItem('saveUserLogin', null);
    localStorage.setItem('savePassword', null);
    localStorage.setItem('idRestaurant', null);
    localStorage.setItem('Name', null);
    localStorage.setItem('role', null);
    return;
}


const Greet = ({ msg }) => (
    <div> {msg} </div>
);

const NoData = (props) => {
    return (
        <div className="no__data">
            <ActivePose
                title={`Noch keine ${props.name}`} />
        </div>
    )
}
const YesData = (props) => {
    return (
        <div className="yes__data">
            {props.data.map((item, key) =>
                <div key={key} className="img__size">
                    {item}
                </div>
            )}
        </div>
    )
}


function filterDataByStartEndDate(data, start, end) {
    if (start && end)
        return filter(data, resv => ( moment(resv.dateReservation).format('DD.MM.YYYY') >= start) && (moment(resv.dateReservation).format('DD.MM.YYYY') <= end));
    else if (start)

        return filter(data, resv => (moment(resv.dateReservation).format('DD.MM.YYYY') >= start));

    else if (end)
        return filter(data, resv => (moment(resv.dateReservation).format('DD.MM.YYYY') <= end));
    else
        return data;
}

const compareDates = asc => (...dates) =>
    asc ? compareAsc(...dates) : compareDesc(...dates);

function sortByStartDate({
    reservation,
    asc = true
}) {
    if (reservation && reservation.length) {
        reservation.sort((...dates) => compareDates(asc)(...dates.map(date => moment(date.dateReservation).toISOString())));
        return reservation;
    }
    else
        return null;
}

export {
    sortByStartDate,
    saveUserdata,
    isSavedDataUser,
    resetUser,
    Greet,
    NoData,
    YesData,
    saveUserIdRestaurant,
    filterDataByStartEndDate
}