import Fetch from 'node-fetch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOKEN } from '../../common/keyStore';
import Constants from 'expo-constants';
const {manifest:{extra:{apiUrl}}} = Constants;

// function getEnvironment() {
//     let releaseChannel = Constants.manifest.releaseChannel;
//     console.log("Constants", Constants)
//     if (releaseChannel === undefined) {
//         // no releaseChannel (is undefined) in dev
//         return { envName: 'DEVELOPMENT', dbUrl: 'aaa', apiKey: 'bbb' }; // dev env settings
//     }
//     if (releaseChannel.indexOf('prod') !== -1) {
//         // matches prod-v1, prod-v2, prod-v3
//         return { envName: 'PRODUCTION', dbUrl: 'ccc', apiKey: 'ddd' }; // prod env settings
//     }
//     if (releaseChannel.indexOf('staging') !== -1) {
//         // matches staging-v1, staging-v2
//         return { envName: 'STAGING', dbUrl: 'eee', apiKey: 'fff' }; // stage env settings
//     }
// }

export const Get = async (path: string, param?: any) => {
    let header = {
        Authorization: "",
        Accept: "application/json",
        "Content-Type": "application/json"
    };
    await AsyncStorage.getItem(TOKEN).then(val => {
        if (val && typeof val == 'string') {
            header.Authorization = `Bearer ${JSON.parse(val) && JSON.parse(val) || ''}`;
        }
    });
    let url = (`${apiUrl}${path}`);
    // url.search = new URLSearchParams(param).toString();
    return Fetch(`${url}`, { method: 'GET', headers: header });
}

export const Post = async (path: string, body: any) => {
    let header = {
        Authorization: "",
        Accept: "application/json",
        "Content-Type": "application/json"
    };
    await AsyncStorage.getItem(TOKEN).then(val => {
      
        if (val && typeof val == 'string') {
            header.Authorization = `Bearer ${JSON.parse(val) && JSON.parse(val) || ''}`;
        }
    });
    return Fetch(`${apiUrl}${path}`, { method: 'POST', headers: header, body: JSON.stringify(body) });
}