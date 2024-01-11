import axiosClient from "./AxiosClient.js";

const serviceApi = {
    getAllServices: () => {
        const url="/services";
        return axiosClient.get(url)
    },
    createNewSevice: (params) => {
        const url="/service";
        return axiosClient.post(url,
            params
        )
    }
}

export default serviceApi;