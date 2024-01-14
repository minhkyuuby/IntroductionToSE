import axiosClient from "./axios-client";

const authApi = {
    login: (params) => {
        const url="/bill";
        return axiosClient.post(url,
            params
        )
    },

}

export default authApi;