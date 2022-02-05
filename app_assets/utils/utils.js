import * as _ from 'lodash';
import { format, parseISO } from 'date-fns';

export function isEmpty(val) {
    return _.isEmpty(val);
}

// 日期时间格式化
export function dateTimeFormatter(dateTimeStr, formatStr) {
    if (dateTimeStr && format) {
        return format(parseISO(dateTimeStr), formatStr);
    } else {
        return null;
    }
}

// 秒转为 HH:MM:SS
export function secondsToHHMMSS(seconds) {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
}

// toast 提示
export function toastr(message) {
    if ($('.toastr').length) {
        return;
    }

    $('body').append(`<div class="toastr rounded-sm">${message}</div>`);
    const toastElement = $('.toastr');
    toastElement.toast({ delay: 1500 });
    toastElement.toast('show');
    toastElement.on('hidden.bs.toast', function () {
        toastElement.remove();
    });
}

// 有效手机号
export function validPhone(phone) {
    return /1\d{10}/.test(phone.toString());
}

// 有效验证码（4位数字）
export function validVcode(vcode) {
    return /\d{4}/.test(vcode.toString());
}

export function Guid() {
    function part() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1).toUpperCase();
    }

    return {
        NewGuid: function () {
            return (part() + part() + '-' + part() + '-' + part() + '-' + part() + '-' + part() + part() + part());
        },
        Empty: '00000000-0000-0000-0000-000000000000',
    };
}
