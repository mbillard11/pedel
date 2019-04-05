import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000/',
})
api.interceptors.request.use(config => {
    config.headers["Authorization"] = "bearer " + localStorage.getItem('token');
    return config
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
})

const myapi = {
    install(Vue, options) {
        Vue.prototype.$api = api
    }
}
export default myapi