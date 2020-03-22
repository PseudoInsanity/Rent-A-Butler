export const userService = {
    login,
    logout,
    getAll,
    addServiceToDatabase,
    signup,
    subscribeToService
};

function login(userName, password) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, password })
    };

    return fetch(`http://localhost:1337/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            if (user) {
                user.authdata = window.btoa(userName + ':' + password);
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;

        });
}

function logout() {

    localStorage.removeItem('user');
}

function signup(firstName, lastName, userName, password) {


    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, userName, password })
    };

    return fetch(`http://localhost:1337/createUser`, requestOptions)
        .then(handleResponse)
        .then(user => {
            if (user) {

            }
            return user;

        });
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }


    };

    return fetch(`http://localhost:1337/service`, requestOptions)
        .then(response => response.json())
        .then((service) => {
            return service;
        });


}

function subscribeToService(serviceName, userId) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceName, userId })
    };

    return fetch(`http://localhost:1337/service`, requestOptions)
        .then(handleResponse)
}

function addServiceToDatabase(serviceName, serviceDescription, servicePrice, userName, userId, img_url) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceName, serviceDescription, servicePrice, userName, userId, img_url })

    };

    return fetch('http://localhost:1337/service', requestOptions)
        .then(handleResponse)
        .then(service => {

            return service;
        })

}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if (data[1] === undefined) {
            if (data.success === 0) {

                logout();
                // eslint-disable-next-line no-restricted-globals
                location.reload(true);
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            } else if (data.success === 1) {
                return data;
            }
        } else {
            if (data[1].success === 0) {

                logout();
                // eslint-disable-next-line no-restricted-globals
                location.reload(true);
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            } else if (data[1].success === 1) {
                return data;
            }
        }

    });
}