const bunyan = require('bunyan');
const constants = require('./../common/constants')
var Promise = require("bluebird");
var logger;
let logFilePath = constants.Client_log_file_path || process.env.LOG_FILE_PATH;

if(process.env.NODE_ENV === constants.Prd)
{
    logger = bunyan.createLogger({
        name: 'todoapp-client',
        streams:[{
            
            type:'rotating-file',
            level:'warn',
            path: logFilePath,
            period:'1d',
            count:7
        }]
    });
}
else {
    logger = bunyan.createLogger({
        name: 'todoapp-client',
        streams:[{
            
            type:'rotating-file',
            level:'debug',
            path: logFilePath,
            period:'1d',
            count:7
        }]
    });
}

module.exports ={
    addLogInfo: (req,res,next)=>{
        logger.info(req.body.message);
        return res.status(200).json({'log':'log is added successfully'})
    },
    addLogWarn: (req,res,next)=>{
        logger.warn(req.body.message);
        return res.status(200).json({'log':'log is added successfully'})
    },
    addLogErr:(req,res,next)=>{
        logger.error(req.body.message);
        return res.status(200).json({'log':'log is added successfully'})
    }
}