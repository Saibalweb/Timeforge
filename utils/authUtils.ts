import AsyncStorage from '@react-native-async-storage/async-storage';
import { setToken } from '../store/slices/authSlice';
import { AppDispatch } from '../store';

export const loadToken = async (dispatch: AppDispatch) => {
  try {
    const token = await AsyncStorage.getItem('token');
    dispatch(setToken(token));
  } catch (error) {
    console.error('Failed to load token', error);
    dispatch(setToken(null));
  }
}; 