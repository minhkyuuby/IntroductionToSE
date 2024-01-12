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
    },
    updateService: (id, params) => {
        const url=`/service/${id}`;
        return axiosClient.put(url,
            params
        )
    }
}

export default serviceApi;