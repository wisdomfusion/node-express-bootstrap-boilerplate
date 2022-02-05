module.exports = {

    // 逻辑判断，如：{{#if (eq a b)}}...
    eq:  (left, right) => left === right,
    ne:  (left, right) => left !== right,
    lt:  (left, right) => left < right,
    gt:  (left, right) => left > right,
    lte: (left, right) => left <= right,
    gte: (left, right) => left >= right,

    not: val => !val,

    // 自增自减，如：{{inc 1}} 结果为 2
    inc: val => val + 1,
    dec: val => val - 1,

    // 绝对值
    abs: val => Math.abs(val),

    // 数组长度
    len: arr => !!arr && arr.length ? arr.length : 0,

    // 数学运算，如：{{math @index '+' 1}}
    math: (lvalue, operator, rvalue) => {
        lvalue = parseFloat(lvalue);
        rvalue = parseFloat(rvalue);
        return {
            '+': lvalue + rvalue,
            '-': lvalue - rvalue,
            '*': lvalue * rvalue,
            '/': lvalue / rvalue,
            '%': lvalue % rvalue
        }[operator];
    },

    // 字符串转为整型
    _toInt: function (str) {
        return parseInt(str, 10);
    },

    // 逻辑与，如：{{#if and(a b c d)}}
    and: function () {
        return Array.prototype.every.call(arguments, Boolean);
    },

    // 逻辑或，如：{{#if or(a b c d)}}
    or: function () {
        return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
    },

    for: function(from, to, incr, block) {
        let accum = '';
        for(let i = from; i < to; i += incr)
            accum += block.fn(i);
        return accum;
    },
};
