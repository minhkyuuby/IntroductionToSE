import axiosClient from "./AxiosClient.js";

const vehicleApi = {
    getAllVehicles: () => {
        const url="/vehicles";
        return axiosClient.get(url)
    },
    getVehiclesByApartment: (apartmentId) => {
        const url=`/apartment/${apartmentId}/vehicles`;
        return axiosClient.get(url)
    },
    createNewVehicle: (params) => {
        const url="/vehicle";
        return axiosClient.post(url,
            params
        )
    },
    deleteVehicle: (id) => {
        const url=`/vehicle/${id}`;
        return axiosClient.delete(url
        )
    },
    updateVehicle: (params) => {

    }
}

export default vehicleApi;