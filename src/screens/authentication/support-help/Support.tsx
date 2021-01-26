import React, { useEffect } from 'react';
import { Text, Dimensions, View, TouchableOpacity } from 'react-native';
import { Screen } from '../../../library/components/screen';

const { width } = Dimensions.get('window');

interface SupportProps {
    navigation: any,
    actionLogout: any,
    route: any
}

export const Support = (props: SupportProps) => {
    const { navigation, route } = props;

    return (
        <Screen
            isScroll={false}
            hidden={false}
            backgroundColor={'transparent'}
            forceInset={{ bottom: 'never', top: 'never' }}
            draw={true}>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Support Help Screen</Text>
        </View>
        </Screen>
    )

}