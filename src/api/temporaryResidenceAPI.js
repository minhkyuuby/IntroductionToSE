import axiosClient from "./AxiosClient.js";

const temporaryResidenceAPI = {
    getAllTemporaryResidence: () => {
        const params= {
            type: 1
        }
        const url="/temporary_cards_where";
        return axiosClient.post(url,
            params
        )
    },

    createNewSevice: (params) => {
        const url="/temporary_card";
        return axiosClient.post(url,
            params
        )
    }
}

export default temporaryResidenceAPI;