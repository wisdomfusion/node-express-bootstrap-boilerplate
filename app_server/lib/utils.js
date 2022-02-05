const { format, parseISO } = require('date-fns');
const logger = require('../../logger');

// 日期时间格式化
module.exports.format = (dateTimeStr, formatStr) => {
    if (dateTimeStr && format) {
        return format(parseISO(dateTimeStr), formatStr);
    } else {
        return null;
    }
};

// 日期范围转为中文时段格式
module.exports.convertDateTimeRangeToLocalText = (startDateTime, endDateTime) => {
    let result = '';
    if (!!startDateTime && !!endDateTime) {
        startDateTime = parseISO(startDateTime);
        endDateTime = parseISO(endDateTime);
        const formattedStartDateTime = format(startDateTime, 'yyyy年M月d日 HH:mm');
        if (format(startDateTime, 'yyyyMMdd') === format(endDateTime, 'yyyyMMdd')) {
            result = `${formattedStartDateTime}—${format(endDateTime, 'HH:mm')}`;
        } else {
            result = `${formattedStartDateTime}—${format(endDateTime, 'yyyy年M月d日 HH:mm')}`;
        }
    }
    logger.info({ 'utils/convertDateTimeRangeToLocalText': result });
    return result;
};

// 数字秒转为 x小时y分z秒
module.exports.secondsToText = seconds => {
    if (!seconds) return '—';

    let text = '';

    const time   = new Date(seconds * 1000).toISOString().substr(11, 8).split(':');
    const hour   = Number(time[0]);
    const minute = Number(time[1]);
    const second = Number(time[2]);

    if (hour) {
        text = hour + '小时';
    }

    if (minute) {
        text = text + minute + '分';
    }

    if (second) {
        text = text + second + '秒';
    }

    return text;
};
