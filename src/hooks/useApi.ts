import axios, { Axios } from 'axios'
export default function useApi():Axios {
    let baseApiURL = 'https://ecommerce-api.udemig.dev/api/v2'

    axios.defaults.baseURL = baseApiURL

    const token = localStorage.getItem('token')

    axios.defaults.headers.common['accept'] = 'application/json'

    if (token) {
        axios.defaults.headers.common['Authorization'] = token
    }

    return axios
}

 