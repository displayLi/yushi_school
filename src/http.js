import axios from "axios";
import { Toast, Indicator } from "mint-ui";

// axios.defaults.baseURL = 'https://api.ziyushi.com'
axios.defaults = Object.assign(axios.defaults, {
    baseURL: "https://api.ziyushi.com",
    // timeout: 0,
    // responseType: "json"
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        // Accept: "application/json"
    }
});

// 添加请求拦截器
axios.interceptors.request.use(
    config => {
        // if (config.axiosLoading) {
        //     Indicator.open();
        // }
        if (config.url.indexOf("token") == -1) {
            config.url +=
                (config.url.indexOf("?") > -1 ? "&" : "?") +
                `token=${sessionStorage.getItem("token") || ""}`;
        }
        if (config.data && !config.data.token) {
            config.data.token = sessionStorage.getItem("token") || "";
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 添加响应拦截器
axios.interceptors.response.use(
    response => {
        console.log(response);
        if (response.status === 200) {
            if (response.data) {
                switch (response.data.code) {
                    case 0: // 正常
                        return response.data.data;
                    default:
                        Toast(response.data.msg);
                        return Promise.reject(response.data.msg);
                }
            } else {
                return response;
            }
        } else {
            Toast(`网络错误!(${response.status})`);
        }
    },
    error => {
        return Promise.reject(error);
    }
);

export default axios;
