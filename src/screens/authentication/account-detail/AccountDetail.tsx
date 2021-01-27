import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Text, View, TouchableWithoutFeedback, Image } from 'react-native';
import { TOKEN } from '../../../common/keyStore';
import { Screen } from '../../../library/components/screen';
import { styles } from './styles';

interface AccountDetailProps {
    navigation: any,
    actionLogout: any,
    route: any
}

export const AccountDetail = (props: AccountDetailProps) => {
    const { navigation, route } = props;
    const { actionLogout } = route.params;

    const onPressToLogout = () => {
        actionLogout && actionLogout();
        AsyncStorage.setItem(TOKEN, "");
    }

    const onPressGoToMenu = () => {
        navigation && navigation.openDrawer();
    }

    return (
        <Screen
            isScroll={false}
            hidden={false}
            backgroundColor={'transparent'}
            forceInset={{ bottom: 'never', top: 'never' }}
            draw={true}>
            <TouchableWithoutFeedback onPress={onPressGoToMenu}
                style={{
                    zIndex: 2
                }}
            >
                <Image
                    source={require('../../../../assets/images/Menu.png')}
                    style={styles.vImgMenu}
                />
            </TouchableWithoutFeedback>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Account Detail Screen</Text>
                <TouchableWithoutFeedback
                    onPress={onPressToLogout}>
                    <View>
                        <Text style={{
                            backgroundColor: '#F5785A',
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                            marginTop: 20
                        }}>
                            Logout
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </Screen>
    )

}