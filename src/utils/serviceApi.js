import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = 'https://determined-pink-foal.cyclic.app/';

const instance = async () => {
  return axios.create({
    baseURL: url,
    headers: {Authorization: `Bearer ${await AsyncStorage.getItem('token')}`},
  });
};

export {instance};
