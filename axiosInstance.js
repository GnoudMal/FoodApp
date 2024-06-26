import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AxiosInstance = (contentType = 'application/json') => {
    const axiosInstance = axios.create({
        baseURL: 'https://665d43ebe88051d60405ed44.mockapi.io',
    });

    axiosInstance.interceptors.request.use(
        async config => {
            const token = await AsyncStorage.getItem('userToken');
            config.headers = {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': contentType
            };
            // console.log(config);
            return config;
        },
        err => Promise.reject(err)
    );

    axiosInstance.interceptors.response.use(
        response => {
            // console.log('Response:', response.data);
            // console.log('Response-status:', response.status);
            // console.log('Response-header:', response.headers);
            return response;
        },
        error => {
            console.log('Response Error:', error);
            if (error.response) {
                console.log('Error Data:', error.response.data);
                console.log('Error Status:', error.response.status);
                console.log('Error Headers:', error.response.headers);
            } else if (error.request) {
                console.log('Error Request:', error.request);
            } else {
                console.log('Error Message:', error.message);
            }
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export default AxiosInstance;
