import * as React from 'react';
import { View, Text, TouchableWithoutFeedback, Image, Dimensions } from 'react-native';
import { Screen } from '../../../library/components/screen';
import { styles } from './styles';
import { CustomHeader } from "../../../components/header";
import { SvgTracker } from '../../../themes/svg';
import { size } from '../../../themes/size';
import { HOME_SCREEN } from '../../../navigation/TypeScreen';
const {width, height} = Dimensions.get('window');

interface PackProps {
    navigation: any,
    actionLogout: any,
    route: any
}

export const PackScreen = (props: PackProps) => {
    const { navigation, route } = props;

    const onBackTracker = () => {
        navigation.navigate(HOME_SCREEN)
    }

    return (
        <Screen
            isScroll={false}
            hidden={false}
            backgroundColor={'transparent'}
            forceInset={{ bottom: 'never', top: 'never' }}
            draw={true}
        >
            <View style={styles.fullScreen}>
                <CustomHeader
                    navigation={navigation}
                    onPressRight={onBackTracker}
                    userName={`aimee`}
                    reminder={`It's been two months since you reassessed your needs.`}
                    imgBackground={require('../../../../assets/images/background_tracker.png')}
                    logoRight={require('../../../../assets/images/logo_tracker.png')}
                />
            </View>
        </Screen>
    );
}
