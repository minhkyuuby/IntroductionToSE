import axiosClient from "./axios-client";

const serviceApi = {
    getAllServices: () => {
        const url="/services";
        return axiosClient.get(url)
    },
    createNewSevice: (params) => {
        
    }
}

export default serviceApi;