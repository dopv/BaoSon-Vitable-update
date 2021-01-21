import React, { useEffect } from "react";
import {
    View, Image
} from "react-native"
import { styles } from "./style";
import { StoreContainer } from "../../../store/store";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOKEN_AUTHENTICATION } from "../../../common/keyStore";
import { Get } from '../../../library/networking/fetch';

export const Splash = (props: any) => {
    const { logout, login } = StoreContainer.useContainer();

    useEffect(() => {
        checkAuthentication()
    }, [])

    const checkAuthentication = () => {
        AsyncStorage.getItem(TOKEN_AUTHENTICATION).then((data: any) => {
            if (JSON.parse(data)) {
                Get('/api/v1/me/profile').then(res => {
                    res.json().then(resJson => {
                        if (resJson.data) {
                            setTimeout(() => {
                                login && login();
                            }, 1000);
                            return;
                        } else {
                            setTimeout(() => {
                                logout && logout();
                            }, 1000);
                        }
                    }).catch(err => {
                        console.log('err', err);
                        setTimeout(() => {
                            logout && logout();
                        }, 1000);
                    })
                })
            } else {
                setTimeout(() => {
                    logout && logout();
                }, 1000);
            }
        });
    }

    return (
        <View style={styles.fullScreen}>
            <View style={styles.vContent}>
                <Image
                    style={styles.logoImage}
                    source={require('../../../../assets/images/Logo.png')}
                    resizeMode='stretch'
                />
            </View>
        </View>
    )
}