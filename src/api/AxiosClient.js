// import axios from 'axios';
// import queryString from 'query-string';

// const axiosClient = axios.create({
//     baseURL:"http://localhost:8000/",
//     headers: {
//         'content-type': 'application/json',
//     },

//     paramsSerializer: params => queryString.stringify(params),

// });


// axiosClient.interceptors.response.use((response) => {
//     console.log('response',response.data);
//     if (response && response.data) {
//         return response.data;
//     }
//     return response;
// }, (error) => {
//     // Handle errors
//     throw error;
// });
// export default axiosClient;