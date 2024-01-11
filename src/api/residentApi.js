import axiosClient from "./AxiosClient.js";

const residentApi = {
    getAllResidents: () => {
        const url="/people";
        return axiosClient.get(url)
    },

    createNewResident: (params) => {
        console.log("create here!")
        console.log(params)

        const url="/people";
        return axiosClient.post(url,
            params
        )
    },

    deleteResident: (residentID) => {
        console.log(residentID)
        console.log(residentID)
        const url = `/apartment/${residentID}`;
        return axiosClient.delete(url)
    },

    editResident: (residentID, updatedResidentData) => {
        const url = `/apartment/${residentID}`;
        return axiosClient.put(url, updatedResidentData);
      }      
}

export default residentApi;