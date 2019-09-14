import config from '../../config'

function getToken() {
    return "Bearer  798f7fb2-ecce-3c76-a675-143038467dd6"
}

export function getRevenueLicenseDetails(vehicle) {
    return callGet(config.dmtUrl + '/revenueLicense/' + vehicle);
}

export function getUserVehicleDetails(vehicle) {
    return callGet(config.dmtUrl + '/users/' + vehicle);
}

export function getUserVehicles(uid) {
    return callGet(config.dmtUrl + '/users/' + uid + "/vehicles");
}

export function removeUserVehicle(uid, vno) {
    return callDelete(config.dmtUrl + '/users/' + uid + "/vehicles/" + vno);
}

export function addUserVehicle(uid,body) {
    return callPost(config.dmtUrl + '/users/' + uid + "/vehicles/", body);
}

export function loginUser(body) {
    return callPost(config.user_backend + '/users/login', body);
}

export function registerUser(body) {
    return callPost(config.user_backend + '/users', body);
}

const callGet = (url) => {
    return fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': getToken(),
            "X-Requested-With": "lk.icta.mobile.apps.dmt"
        })
    }).then(handleres);
}

const callPost = (url, body) => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    }).then(handleres);
}

const callDelete = (url) => {
    return fetch(url, {
        method: 'DELETE'
    }).then(handleres);
}

const handleres = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(res.status + " : " + res.statusText);
    }
}