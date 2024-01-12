import axiosClient from "./AxiosClient.js";

const apartmentApi = {
    getAllApartments: () => {
        const url="/apartments";
        return axiosClient.get(url)
    },

    createNewRoom: (params) => {
        const url="/apartment";
        return axiosClient.post(url,
            params
        )
    },

    deleteRoom: (roomId) => {
        const url = `/apartment/${roomId}`;
        return axiosClient.delete(url)
    },

    editRoom: (roomId, updatedRoomData) => {
        const url = `/apartment/${roomId}`;
        return axiosClient.put(url, updatedRoomData);
    },
    
    getApartmentPeople: (apartmentId) => {
        console.log(apartmentId)
        const url = `/apartment/${apartmentId}/people`
        return axiosClient.get(url);
    }
}

export default apartmentApi;