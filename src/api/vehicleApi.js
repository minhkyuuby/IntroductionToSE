import axiosClient from "./AxiosClient.js";

const vehicleApi = {
    getAllVehicles: () => {
        const url="/vehicles";
        return axiosClient.get(url)
    },
    createNewVehicle: (params) => {
        console.log(params)
        console.log(params)
        const url="/vehicle";
        return axiosClient.post(url,
            params
        )
    }
}

export default vehicleApi;