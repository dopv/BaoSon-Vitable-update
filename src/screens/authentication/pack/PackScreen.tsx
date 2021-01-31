import React, { useState, useRef, Children, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Image, Dimensions } from 'react-native';
import { Screen } from '../../../library/components/screen';
import { styles } from './styles';
import { CustomHeader } from "../../../components/header";
import { SvgTracker } from '../../../themes/svg';
import { size } from '../../../themes/size';
import { HOME_SCREEN } from '../../../navigation/TypeScreen';
import { CustomPage } from '../../../components/page';
import { CustomListProduct } from '../../../components/listProduct/listProduct';
import { Get } from '../../../library/networking/fetch';
import DropDownHolder from '../../../library/utils/dropDownHolder';
import { translate } from '../../../library/utils/i18n/translate';

const { width, height } = Dimensions.get('window');

interface PackProps {
    navigation: any,
}

export const PackScreen = (props: PackProps) => {
    const { navigation } = props;
    const [tabIndex, setTabIndex] = useState(0);


    const onBackTracker = () => {
        navigation.navigate(HOME_SCREEN)
    }

    return (
        <Screen
            isScroll={false}
            hidden={false}
            backgroundColor={'transparent'}
            forceInset={{ bottom: 'never', top: 'never' }}
        // draw={true}
        >
            <View style={styles.fullScreen}>
                <CustomHeader
                    navigation={navigation}
                    onPressRight={onBackTracker}
                    userName={`aimee`}
                    reminder={`Your January pack will be delivered to you soon. You can still edit the delivery date.`}
                    imgBackground={require('../../../../assets/images/background_tracker.png')}
                    logoRight={require('../../../../assets/images/logo_tracker.png')}
                />
                <CustomPage
                    navigation={navigation}
                    tabIndex={tabIndex}
                    setTabIndex={setTabIndex}
                    titleLeft={'In transit pack'}
                    titleRight={'Next pack'}
                    viewPageLeft={<CustomListProduct type={'TRANSIT'}/>}
                    viewPageRight={<CustomListProduct type={'SUBSCRIPTION'}/>
                }
                />

            </View>
        </Screen>
    );
}
