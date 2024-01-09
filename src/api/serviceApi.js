import axiosClient from "./AxiosClient.js";

const serviceApi = {
    getAllServices: () => {
        const url="/services";
        return axiosClient.get(url)
    },
    createNewSevice: (params) => {
        console.log(params)
        console.log(params)
        const url="/service";
        return axiosClient.post(url,
            params
        )
    }
}

export default serviceApi;