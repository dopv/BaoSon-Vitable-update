import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Text, View, TouchableWithoutFeedback, Image } from 'react-native';
import { TOKEN } from '../../../common/keyStore';
import { Screen } from '../../../library/components/screen';
import { styles } from './styles';
import { useContainer } from '../../../store/store';

interface AccountDetailProps {
    navigation: any
}

export const AccountDetail = (props: AccountDetailProps) => {
    const logoutAction = useContainer(container => container.logoutAction);
    const { navigation } = props;

    const onPressToLogout = () => {
        logoutAction();
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
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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