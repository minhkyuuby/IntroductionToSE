import axiosClient from "./AxiosClient.js";

const apartmentApi = {
    getAllApartments: () => {
        const url="/apartments";
        return axiosClient.get(url)
    },

    createNewRoom: (params) => {
        console.log(params)
        console.log(params)
        const url="/apartment";
        return axiosClient.post(url,
            params
        )
    },

    deleteRoom: (roomId) => {
        console.log(roomId)
        console.log(roomId)
        const url = `/apartment/${roomId}`;
        return axiosClient.delete(url)
    },

    editRoom: (roomId, updatedRoomData) => {
        const url = `/apartment/${roomId}`;
        return axiosClient.put(url, updatedRoomData);
      }      
}

export default apartmentApi;