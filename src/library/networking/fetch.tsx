import Fetch from 'node-fetch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOKEN_AUTHENTICATION } from '../../common/keyStore';
import Constants from 'expo-constants';
const {manifest:{extra:{apiUrl}}} = Constants;

export const Get = async (path: string, param?: any) => {
    let header = {
        Authorization: "",
        Accept: "application/json",
        "Content-Type": "application/json"
    };
    await AsyncStorage.getItem(TOKEN_AUTHENTICATION).then(val => {
        if (val) {
            header.Authorization = `Bearer ${JSON.parse(val) && JSON.parse(val).access_token || ''}`;
        }
    });
    let url = new URL(`${apiUrl}${path}`);
    url.search = new URLSearchParams(param).toString();
    return Fetch(`${url}`, { method: 'GET', headers: header });
}

export const Post = async (path: string, body: any) => {
    let header = {
        Authorization: "",
        Accept: "application/json",
        "Content-Type": "application/json"
    };
    await AsyncStorage.getItem(TOKEN_AUTHENTICATION).then(val => {
        if (val) {
            header.Authorization = `Bearer ${val}`;
        }
    });
    return Fetch(`${apiUrl}${path}`, { method: 'POST', headers: header, body: JSON.stringify(body) });
}