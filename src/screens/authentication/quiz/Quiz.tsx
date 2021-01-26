import React, { useEffect } from 'react';
import { Text, Dimensions, View, TouchableOpacity } from 'react-native';
import { Screen } from '../../../library/components/screen';

const { width } = Dimensions.get('window');

interface QuizProps {
    navigation: any,
    actionLogout: any,
    route: any
}

export const Quiz = (props: QuizProps) => {
    const { navigation, route } = props;

    return (
        <Screen
            isScroll={false}
            hidden={false}
            backgroundColor={'transparent'}
            forceInset={{ bottom: 'never', top: 'never' }}
            draw={true}>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Quiz Screen</Text>
        </View>
        </Screen>
    )

}