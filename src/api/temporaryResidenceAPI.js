import axiosClient from "./AxiosClient.js";

const temporaryResidentAPI = {
    getAllTemporaryLeave: () => {
        const params= {
            type: "1"
        }
        const url="/temporary_cards_where";
        return axiosClient.post(url,
            params
        )
    },

    createNewTemporaryLeaveCard: (params) => {
        console.log(params)
        const url="/temporary_card";
        return axiosClient.post(url,
            params
        )
    },

    deleteTemporaryLeaveCard: (cardId) => {
        const url=`/temporary_card/${cardId}`
        return axiosClient.delete(url)
    }
}

export default temporaryResidentAPI;