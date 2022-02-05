import * as _ from 'lodash';
import Cookies from 'js-cookie';
import config from '@/config';

const apiPrefix = config.API_URL_PREFIX;

function _request(url, method, data) {
    const token = Cookies.get('UserAuthorization');

    return $.ajax({
        type: method,
        url,
        contentType: 'application/json; charset=utf-8',
        headers: { UserAuthorization: token },
        data: JSON.stringify(data),
        dataType: 'json',
        crossDomain: true,
    });
}

/**
 * GET
 * @param url
 * @param params
 * @returns {*}
 */
export function httpGet(url, params) {
    if (!_.isEmpty(params)) {
        const q = Object.entries(params).map(([k, v]) => `${k}=${v}`).join('&');
        url = `${apiPrefix}${url}?${q}`;
    }
    return _request(url, 'GET');
}

/**
 * POST
 * @param url
 * @param data
 * @returns {*}
 */
export function httpPost(url, data) {
    return _request(apiPrefix + url, 'POST', data);
}

/**
 * PUT
 * @param url
 * @param data
 * @returns {*}
 */
export function httpPut(url, data) {
    return _request(apiPrefix + url, 'PUT', data);
}

/**
 * PATCH
 * @param url
 * @param data
 * @returns {*}
 */
export function httpPatch(url, data) {
    return _request(apiPrefix + url, 'PATCH', data);
}

/**
 * DELETE
 * @param url
 * @param data
 * @returns {*}
 */
export function httpDelete(url, data) {
    return _request(apiPrefix + url, 'DELETE', data);
}
