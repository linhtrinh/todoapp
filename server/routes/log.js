const logController = require('./../controllers/log.ctrl')
const multipart = require('connect-multiparty')
const multipartWare = multipart()

module.exports = (router) => {
    /**
     * add log info
     */
    router
        .route('/log/info')
        .post(multipartWare, logController.addLogInfo);

    /**
     * add log warning
     */
    router
        .route('/log/warn')
        .post(multipartWare, logController.addLogWarn);

    /**
     * add log error
     */
    router
        .route('/log/err')
        .post(multipartWare, logController.addLogErr);
    
   
}