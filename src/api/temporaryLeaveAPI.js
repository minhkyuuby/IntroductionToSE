import axiosClient from "./AxiosClient.js";

const temporaryLeaveAPI = {
    getAllTemporaryLeave: () => {
        const params= {
            type: "0"
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
    }
}

export default temporaryLeaveAPI;