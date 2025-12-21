import consts from '../consts';

const logger_mark = `[${consts.initial}]`;

function log(...data: any[]) {
    console.log(logger_mark, ...data);
}

function error(...data: any[]) {
    console.error(logger_mark, 'An Error occurred →', ...data);
}

function warn(...data: any[]) {
    console.warn(logger_mark, ...data);
}

export default {
    log, error, warn
}
