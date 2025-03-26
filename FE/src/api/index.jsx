import axios from 'axios';

const BASE_URL = "http://localhost:5050"

export const getList = async(data)=>{
    const response = await axios.get(`${BASE_URL}/lists`, data);
    return response.data;
}

