import axiosClient from "./axios-client";

const authApi = {
    getActiveContestList: () => {
        const url="/api/v1/project/contests";
        return axiosClient.get(url, 
            {
                active: 1
            })
    },
}

export default authApi;