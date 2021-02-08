import React, { useEffect, useState} from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { Screen } from '../../../library/components/screen';
import { Get } from '../../../library/networking/fetch';
import { ONBOARDING_SCROLL } from '../../../navigation/TypeScreen';
import { styles } from './styles';
import Fetch from 'node-fetch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const { manifest: { extra: { apiUrl } } } = Constants;

export const OnBoarding = (props: any) => {
    const { navigation, route } = props;
    const { data } = route.params;
    const [name, setName] = useState('');
    const onStartBoarding = () => {
        navigation && navigation.navigate(ONBOARDING_SCROLL, { data: data })
    };

    useEffect(() => {
        let header = {
            Authorization: `Bearer ${data.access_token}`,
            Accept: "application/json",
            "Content-Type": "application/json"
        };

        let url = new URL(`${apiUrl}/api/v1/me/profile`);
        // url.search = new URLSearchParams(param).toString();
       Fetch(`${url}`, { method: 'GET', headers: header }).then(response => {
            response.json().then(data => {
                console.log("data", data.data)
                const name = data && data.data && data.data.customer && data.data.customer.data && data.data.customer.data.name_on_pack || "";
                setName(name);
            });
        }).catch(err => {
            console.log('err', err);
        })
    },[])
    return (
        <Screen
            isScroll={false}
            hidden={false}
            backgroundColor={'transparent'}
            forceInset={{ bottom: 'never', top: 'never' }}
            draw={true}
        >
            <View>
                <ImageBackground
                    source={require('../../../../assets/images/onboarding/Vitable_HeroImages_341.png')}
                    style={styles.vBackground}
                    resizeMode='stretch'
                >
                    <View style={styles.viewTextDearAime}>
                        <View >
                            <View style={{
                                alignItems: 'center',
                                justifyContent: "center",
                            }}>
                                <Text style={styles.textDear}>Dear</Text>
                            </View>
                        </View>
                        <View style={styles.textAime}>
                           <Text style={styles.tName}>{`${name},`}</Text>
                        </View>

                    </View>
                    <View style={styles.viewTextContent}>
                        <Text style={styles.textContent} >
                            Your health is your most precious gift, so we created the easiest way to keep your health routine going.
                            </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.buttonStarted}
                        onPress={onStartBoarding}
                    >
                        <Text
                            style={styles.textButton}
                            allowFontScaling={false}
                        >Let’s get you started
                        </Text>
                    </TouchableOpacity>
                </ImageBackground>

            </View>
        </Screen>
    );
}
