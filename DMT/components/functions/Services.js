import config from '../../config'

function getToken() {
    return "Bearer  798f7fb2-ecce-3c76-a675-143038467dd6"
}

export function getRevenueLicenseDetails(vehicle) {
    return callGet(config.dmtUrl + '/vehicle/revenueLicense/' + vehicle);
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


const handleres = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject();
    }
}