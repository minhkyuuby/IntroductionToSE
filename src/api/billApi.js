import axiosClient from "./AxiosClient.js";

const billApi = {
    getAllBills: () => {
        const url="/bills";
        return axiosClient.get(url)
    },

    createNewBill: (params) => {
        console.log(params)
        const url="/bill";
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

export default billApi;