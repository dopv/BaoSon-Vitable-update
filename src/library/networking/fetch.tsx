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
    // console.log('Get', path)
    let header = {
        Authorization: "",
        Accept: "application/json",
        "Content-Type": "application/json"
    };
    let tokenJson = await AsyncStorage.getItem(TOKEN);
    console.log('tokenJson', tokenJson)
    let token
    try{
      token = JSON.parse(tokenJson)
    }catch(e){
      console.log('e', e)
      AsyncStorage.setItem(TOKEN, '');
    }
    console.log('token', token)
    if(token) header.Authorization = `Bearer ${token}`;
    let url = (`${apiUrl}${path}`);
    // url.search = new URLSearchParams(param).toString();
    return Fetch(`${url}`, { method: 'GET', headers: header });
}

export const Post = async (path: string, body: any) => {
    // console.log('Post', path)
    let header = {
        Authorization: "",
        Accept: "application/json",
        "Content-Type": "application/json"
    };
    await AsyncStorage.getItem(TOKEN).then(tokenJson => {
        let token
        try{
          token = JSON.parse(tokenJson)
        }catch(e){
          console.log('e', e)
          AsyncStorage.setItem(TOKEN, '');
        }
        if (token) {
            header.Authorization = `Bearer ${token}`;
        }
    });
    return Fetch(`${apiUrl}${path}`, { method: 'POST', headers: header, body: JSON.stringify(body) });
}

export const Put = async (path: string, body?: any) => {
    // console.log('Put', path)
    let header = {
        Authorization: "",
        Accept: "application/json",
        "Content-Type": "application/json"
    };
    await AsyncStorage.getItem(TOKEN).then(tokenJson => {
        let token
        try{
          token = JSON.parse(tokenJson)
        }catch(e){
          console.log('e', e)
          AsyncStorage.setItem(TOKEN, '');
        }
        if (token) {
            header.Authorization = `Bearer ${token}`;
        }
    });
    return Fetch(`${apiUrl}${path}`, { method: 'PUT', headers: header, body: JSON.stringify(body) });
}
