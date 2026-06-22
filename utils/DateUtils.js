"use strict";

/**
 * Formats a date based on the DATE_FORMAT environment variable
 * Supported tokens: YYYY, MM, DD, HH, mm, ss
 */
function formatDate(dateInput) {
    if (!dateInput) return '-';
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return '-';

    const format = process.env.DATE_FORMAT || 'DD-MM-YYYY HH:mm:ss';

    const map = {
        'YYYY': date.getFullYear(),
        'MM': String(date.getMonth() + 1).padStart(2, '0'),
        'DD': String(date.getDate()).padStart(2, '0'),
        'HH': String(date.getHours()).padStart(2, '0'),
        'mm': String(date.getMinutes()).padStart(2, '0'),
        'ss': String(date.getSeconds()).padStart(2, '0')
    };

    return Object.keys(map).reduce((acc, key) => acc.replace(key, String(map[key])), format);
}

module.exports = { formatDate };
