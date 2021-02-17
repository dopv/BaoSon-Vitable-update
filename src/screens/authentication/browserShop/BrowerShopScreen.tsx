import * as React from 'react';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import { Screen } from '../../../library/components/screen';
import { styles } from './styles';

interface BrowserShopProps {
    navigation: any
}

export const BrowserShopScreen = (props: BrowserShopProps) => {
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
                <Text>Browser Shop screen</Text>
            </View>
        </Screen>
    );
}
