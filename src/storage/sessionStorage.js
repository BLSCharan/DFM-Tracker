import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'DFM_SESSIONS';

export const getSessions = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const saveSession = async (session) => {
  try {
    const existing = await getSessions();
    const updated = [session, ...existing]; // latest first
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.log('Save error', e);
  }
};
