import axiosClient from "./AxiosClient.js";

const pair_apartment_peopleAPI = {
    getAllPairs: () => {
        const url="/pair_apartment_people";
        return axiosClient.get(url)
    },

    createNewPair: (params) => {
        const url="/pair_apartment_people";
        return axiosClient.post(url,
            params
        )
    },

    deletePair: (params) => {
        const url = "/pair_apartment_people";
        return axiosClient.delete(url, {
          data: params
        });
      },
}

export default pair_apartment_peopleAPI;