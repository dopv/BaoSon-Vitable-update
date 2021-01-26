import * as React from 'react';
import { View, Text } from 'react-native';
import { Screen } from '../../../library/components/screen';
export const PackScreen = () => {
    return (
        <Screen
            isScroll={false}
            hidden={false}
            backgroundColor={'transparent'}
            forceInset={{ bottom: 'never', top: 'never' }}
            draw={true}>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>My Pack Screen</Text>
            </View>
        </Screen>
    );
}
