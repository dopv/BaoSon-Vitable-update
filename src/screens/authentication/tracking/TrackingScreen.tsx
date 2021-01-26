import * as React from 'react';
import { View, Text } from 'react-native';
import { Screen } from '../../../library/components/screen';
export const TrackingScreen = () => {
    return (
        <Screen
            isScroll={false}
            hidden={false}
            backgroundColor={'transparent'}
            forceInset={{ bottom: 'never', top: 'never' }}
            draw={true}>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Tracking My Vitamin Screen</Text>
        </View>
        </Screen>
    );
}
