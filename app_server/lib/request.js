const axios = require('axios');
const _ = require('lodash');
const logger = require('../../logger');

const config = require('../config');

const request = axios.create({
    baseURL: config.BACKEND_API_PREFIX,
    timeout: 5000,
    withCredentials: true,
    crossDomain: true,
});

request.interceptors.request.use(
    config => {
        // TODO
        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

module.exports.httpGet = (token, url, params = {}) => {
    return new Promise((resolve, reject) => {
        request.defaults.headers['UserAuthorization'] = token;

        if (!_.isEmpty(params)) {
            const q = Object.entries(params).map(([k, v]) => `${k}=${v}`).join('&');
            url = `${url}?${q}`;
            // logger.info({ 'GET/url': url });
        }

        request.get(url)
            .then(res => {
                // logger.info({ 'GET/res.data': res.data });
                if (res.data && res.data.status_code === 200) {
                    resolve(res.data.data);
                } else if (res.data && res.data.status_code === 400) {
                    resolve(res.data.data);
                } else {
                    reject(res.data);
                }
            })
            .catch(err => {
                reject(err);
            });
    });
}

module.exports.httpPost = (token, url, data, options = {}) => {
    return new Promise((resolve, reject) => {
        request.defaults.headers['UserAuthorization'] = token;

        request.post(url, data, options)
            .then(res => {
                // logger.info({ 'POST/res.data': res.data });
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

module.exports.httpPut = (token, url, data, options = {}) => {
    return new Promise((resolve, reject) => {
        request.defaults.headers['UserAuthorization'] = token;

        request.put(url, data, options)
            .then(res => {
                // logger.info({ 'PUT/res.data': res.data });
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

module.exports.httpPatch = (token, url, data, options = {}) => {
    return new Promise((resolve, reject) => {
        request.defaults.headers['UserAuthorization'] = token;

        request.patch(url, data, options)
            .then(res => {
                // logger.info({ 'PATCH/res.data': res.data });
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

module.exports.httpDelete = (token, url, options = {}) => {
    return new Promise((resolve, reject) => {
        request.defaults.headers['UserAuthorization'] = token;

        request.delete(url, options)
            .then(res => {
                // logger.info({ 'DELETE/res.data': res.data });
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}