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

    updateBill: (billId, params) => {
        const url = `/bill/${billId}`
        return axiosClient.put(url, params)
    },

    deleteBill: (billId) => {
        const url = `/bill/${billId}`;
        return axiosClient.delete(url)
    },

    getBilldetails: (billId) => {
        const url = `/bill/${billId}`;
        return axiosClient.get(url);
      }      
}

export default billApi;