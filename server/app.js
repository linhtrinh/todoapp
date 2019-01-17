const express = require('express')
const routes = require('./routes/')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const morgan = require('morgan')
const bunyan = require('bunyan')
const constants = require('./common/constants')
const app = express()
const router = express.Router()

/** 
 * todo: change it to env file configure
 * connect to MongoDB datastore */
try {
    let db_con = constants.Db_Con || process.env.DB_CON;

    mongoose.connect(db_con, {
        //useMongoClient: true
        useNewUrlParser: true
    }).then(()=>{
        console.log('Database is connected');
    });
} catch (error) {
    console.log('Can not connect to the database'+ error);
}

let port = constants.Dev_Port || process.env.PORT;
/** set up routes {API Endpoints} */
routes(router)
/** set up middlewares */
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(helmet())

//app.use('/static',express.static(path.join(__dirname,'static')))

app.use('/api', router)


//todo: check custom log 
let logFilePath = constants.Log_file_path || process.env.LOG_FILE_PATH;

if(process.env.NODE_ENV === constants.Prd)
{
    //prd env
    app.use(require('express-bunyan-logger')({
        name:'todoapp',
        streams:[{
            
            type:'rotating-file',
            level:'warn',
            path: logFilePath,
            period:'1d',
            count:7
        }]
    }));
}
else
{
    //stg, dev log everything

    //define log format
    var loggerFormat= '[:date[web]]|:method|:url|:status|:response-time';
    app.use(morgan(loggerFormat,{
        skip: (req, res) => {
            return res.statusCode < 400
        }, stream: process.stderr
    }));
    app.use(morgan(loggerFormat,{
        skip:(req,res)=>{
            return res.statusCode >= 400
        }, stream: process.stdout
    }));

    
    app.use(require('express-bunyan-logger')({
        name:'todoapp',
        streams:[{
            
            type:'rotating-file',
            level:'debug',
            path: logFilePath,
            period:'1d',
            count:7
        }]
    }));
}


/** start server */
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});