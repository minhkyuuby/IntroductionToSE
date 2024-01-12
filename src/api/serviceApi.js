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
    },
    deleteService: (serviceId) => {
        const url = `/service/${serviceId}`
        return axiosClient.delete(url)
    }
}

export default serviceApi;