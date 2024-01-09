import axiosClient from "./axios-client";

const apartmentApi = {
    getAllApartments: () => {
        const url="/apartments";
        return axiosClient.get(url, 
            {
                active: 1
            })
    },
}

export default apartmentApi;