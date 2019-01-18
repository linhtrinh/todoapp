const task = require('./task')
const log = require('./log')
module.exports = (router) => {
    task(router);
    log(router);
}