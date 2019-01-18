import axios from 'axios';
const devBaseUrl = "http://localhost:5000/api/";
const url = process.env.NODE_ENV === 'production' ? "/api/" : devBaseUrl;

export function createTask(obj)
{
    return axios.post(`${url}task`,obj)
        .catch((err)=>{
            var mess = {message: 'can"t create task ' + err};
            addLogErr(mess);
        });
}

export function getAllTasks()
{
    return axios.get(`${url}tasks`)
    .catch((err)=>{
        var mess = {message: 'can"t get tasks ' + err};
        addLogErr(mess);
    });
}

export function getTaskById(id)
{
    return axios.get(`${url}task/`+id)
    .catch((err)=>{
        var mess = {message: 'can"t get task by id ' + err};
        addLogErr(mess);
    });
}

export function updateTask(id, obj)
{
    return axios.post(`${url}task/update/`+id,obj)
    .catch((err)=>{
        var mess = {message: 'can"t update task ' + err};
        addLogErr(mess);
    });
}
export function deleteTask(id)
{
    return axios.get(`${url}task/delete/`+id)
    .catch((err)=>{
        var mess = {message: 'can"t delete task ' + err};
        addLogErr(mess);
    });
}

function addLogInfo(message){
    return axios.post(`${url}log/info`,message)
        .catch((err)=>{console.log(err)});
}

function addLogWarn(message){
    return axios.post(`${url}log/warn`,message)
        .catch((err)=>{console.log(err)});
}

function addLogErr(message){
    return axios.post(`${url}log/err`,message)
        .catch((err)=>{console.log(err)});
}