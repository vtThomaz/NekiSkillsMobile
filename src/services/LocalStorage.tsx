// import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from "@react-native-async-storage/async-storage";

const storeLocalData = async (key: string, value: any) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
        var tempData: any = await retrieveLocalData(key);

    } catch (error) {
    }
};

const retrieveLocalData = async (key: string) => {
    var data = null;
    try {
        data = await AsyncStorage.getItem(key);
        
    } catch (error) {
    }
    return data;
};

const clearStorage = async () => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
    }
};
export { storeLocalData, retrieveLocalData, clearStorage };