import axiosClient from "./AxiosClient.js";

const residentApi = {
    getAllResidents: () => {
        const url="/people";
        return axiosClient.get(url)
    },

    createNewResident: (params) => {
        const url="/people";
        return axiosClient.post(url,
            params
        )
    },

    deleteResident: (residentID) => {
        const url = `/people/${residentID}`;
        return axiosClient.delete(url)
    },

    editResident: (residentID, updatedResidentData) => {
        console.log(updatedResidentData)
        const url = `/people/${residentID}`;
        return axiosClient.put(url, updatedResidentData);
    },
    
    getPeopleApartments: (residentID) => {
        const url = `/people/${residentID}/apartments`
        return axiosClient.get(url);
    }
}

export default residentApi;