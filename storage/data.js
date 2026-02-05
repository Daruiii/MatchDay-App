import AsyncStorage from '@react-native-async-storage/async-storage';

const storeObjectData = async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (error) {
            // Error storing data
        }
}

const getObjectData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
        return null;
    }
}

const removeObjectData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        // Error removing data
    }
}

const updateObjectData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
        // Error updating data
    }
}

export { storeObjectData, getObjectData, removeObjectData, updateObjectData };