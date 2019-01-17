import axios from 'axios';
const devBaseUrl = "http://localhost:5000/api/";
const url = process.env.NODE_ENV === 'production' ? "/api/" : devBaseUrl;

export function createTask(obj)
{
    return axios.post(`${url}task`,obj)
        .catch((err)=>{console.log(err)});
}

export function getAllTasks()
{
    return axios.get(`${url}tasks`)
        .catch((err)=>{console.log(err)});
}

export function getTaskById(id)
{
    return axios.get(`${url}task/`+id)
        .catch((err)=>{console.log(err)});
}

export function updateTask(id, obj)
{
    return axios.post(`${url}task/update/`+id,obj)
    .catch((err)=>{console.log(err)});
}
export function deleteTask(id)
{
    return axios.get(`${url}task/delete/`+id)
        .catch((err)=>{console.log(err)});
}