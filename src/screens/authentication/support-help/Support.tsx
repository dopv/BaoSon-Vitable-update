import * as React from 'react';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import { Screen } from '../../../library/components/screen';
import { styles } from './styles';

interface SupportProps {
    navigation: any
}

export const Support = (props: SupportProps) => {
    const { navigation } = props;

    const onPressGoToMenu = () => {
        navigation && navigation.openDrawer();
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
                <Text>Support Help Screen</Text>
            </View>
        </Screen>
    );
}