import Cookies from 'js-cookie';
import { isEmpty } from '@utils/utils';

/**
 * 获取 cookie 中 key 的值
 * @param key
 * @returns {any}
 */
export function getCookie(key) {
    const value = Cookies.get(key);
    return !!value ? JSON.parse(value) : undefined;
}

/**
 * 把 key/value 存入 cookie
 * @param key
 * @param value
 * @param expires
 * @param path
 */
export function setCookie(key, value, expires = 30, path = '/') {
    if (!isEmpty(value)) {
        Cookies.set(key, JSON.stringify(value), { expires, path });
    }
}

/**
 * 从 cookie 中移除 key
 * @param key
 */
export function removeCookie(key) {
    Cookies.remove(key);
}
