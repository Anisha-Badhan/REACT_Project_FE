import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import dotenv from 'dotenv'
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery.js';

dotenv.config()
setInterval(async () => {
    axios.get("process.env.REACT_APP_BACKEND_API/test").then(data=>{
        console.log(data)
    })
        .catch(e=>{
            console.log(e.response)
        })
},60 * 1000)


axios.defaults.baseURL = process.env.REACT_APP_BACKEND_API;

let userData =  JSON.parse(localStorage.getItem("userData"))
let token
if(userData){
    token= userData.token
}

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(request => {

    return request;
}, error => {

    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    // Edit response config
    //console.log(response);
    return response;
}, error => {
    console.log(error.response);
    return Promise.reject(error);
});




ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,


    document.getElementById('root')
);


serviceWorker.unregister();