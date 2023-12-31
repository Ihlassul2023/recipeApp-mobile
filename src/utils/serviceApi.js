import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = 'https://determined-pink-foal.cyclic.app';

const instance = axios.create({
  baseURL: `${url}`,
});
instance.interceptors.request.use(async config => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error('Error retrieving token:', error);
  }
  return config;
});

export {instance};
