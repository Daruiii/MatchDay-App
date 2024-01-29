import AsyncStorage from '@react-native-async-storage/async-storage';

const storeObjectData = async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
            console.log("Data stored successfully" + jsonValue);
        } catch (error) {
            console.log("Error storing data" + error);
        }
}

const getObjectData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        // console.log("Data retrieved successfully -- " + key + ":" + jsonValue);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
        console.log("Error getting data");
    }
}

const removeObjectData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        console.log("Data removed successfully" + key);
    } catch (error) {
        console.log("Error removing data");
    }
}

const updateObjectData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
        console.log("Data updated successfully" + jsonValue);
    } catch (error) {
        console.log("Error updating data" + error);
    }
}

export { storeObjectData, getObjectData, removeObjectData, updateObjectData };