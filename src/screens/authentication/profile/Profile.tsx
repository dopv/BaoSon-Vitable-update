import * as React from 'react';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import { Screen } from '../../../library/components/screen';
import { styles } from './styles';

interface ProfileProps {
    navigation: any,
    actionLogout: any,
    route: any
}

export const Profile = (props: ProfileProps) => {
    const { navigation, route } = props;

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
                <Text>Profile Screen</Text>
            </View>
        </Screen>
    );
}