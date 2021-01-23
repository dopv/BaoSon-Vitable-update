import React, { useEffect } from 'react';
import { Text, Dimensions, View, TouchableOpacity } from 'react-native';
import { Screen } from '../../../library/components/screen/index';
import { FONT_15 } from '../../../themes/fontSize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOKEN } from '../../../common/keyStore';
import { translate } from '../../../library/utils/i18n/translate';

const { width } = Dimensions.get('window');

interface DashboardProps {
    navigation: any,
    actionLogout: any,
    route: any
}

export const Dashboard = (props: DashboardProps) => {
    const { navigation, route } = props;
    const { actionLogout } = route.params

    useEffect(() => {
    }, []);

    const logOut = () => {
        AsyncStorage.setItem(TOKEN, JSON.stringify(""));
        actionLogout && actionLogout();
    }

    return <Screen
        isScroll={false}
        hidden={false}
        backgroundColor={'transparent'}
        forceInset={{ bottom: 'never', top: 'never' }}
    >
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center'
        }}>
            <Text
                style={{
                    fontSize: FONT_15,
                    alignContent: 'center',
                    backgroundColor: 'red',
                    textAlign: 'center',
                    paddingVertical: width * 0.05
                }}
            >Dashboard</Text>
            <TouchableOpacity
                onPress={logOut}
                style={{
                    backgroundColor: 'green',
                    alignItems: 'center',
                    marginTop: 20,
                    minHeight: width * 0.1,
                    justifyContent: 'center',
                    borderRadius: 5,
                    width: width * 0.95,
                    marginHorizontal: width * 0.025
                }}
            >
                <Text
                    style={{ fontSize: FONT_15 }}
                >
                    {translate('unauthentic:logout') || ""}
            </Text>
            </TouchableOpacity>
        </View>
    </Screen>

}