import React from 'react';
import { Text, View, TouchableWithoutFeedback, Image } from 'react-native';
import { Screen } from '../../../library/components/screen';
import { styles } from './styles';

interface QuizProps {
    navigation: any
}

export const Quiz = (props: QuizProps) => {
    const { navigation } = props;

    const goBack = () => {
        navigation && navigation.goBack();
    }

    return (
        <Screen
            isScroll={false}
            hidden={false}
            backgroundColor={'transparent'}
            forceInset={{ bottom: 'never', top: 'never' }}
            draw={true}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableWithoutFeedback
                    onPress={goBack}
                    style={{ zIndex: 999 }}
                >
                    <View
                        style={styles.vClose}
                    >
                        <Image
                            source={require('../../../../assets/images/Close.png')}
                            style={styles.sImgClose}
                        />
                    </View>
                </TouchableWithoutFeedback>
                <Text>Quiz Screen</Text>
            </View>
        </Screen>
    )

}