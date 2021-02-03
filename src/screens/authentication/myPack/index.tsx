import React, { useState, useRef, Children, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Image, Dimensions } from 'react-native';
import { Screen } from '../../../library/components/screen';
import { styles } from './styles';
import { CustomHeader } from "../../../components/header";
import { SvgBack, SvgTracker } from '../../../themes/svg';
import { size } from '../../../themes/size';
import { HOME_SCREEN } from '../../../navigation/TypeScreen';
import { CustomPage } from '../../../components/page';
import { CustomListProduct } from '../../../components/listProduct/listProduct';
import { Get } from '../../../library/networking/fetch';
import DropDownHolder from '../../../library/utils/dropDownHolder';
import { translate } from '../../../library/utils/i18n/translate';
import { CustomListManagePack } from './component/listManagePack';
import { analytics } from 'firebase';

const { width, height } = Dimensions.get('window');

interface MyPackProps {
    navigation: any,
    route: any
}

export const MyPackScreen = (props: MyPackProps) => {
    const { navigation, route } = props;
    const dataList = route && route.params && route.params.dataList || []
    const goBack = () => {
        navigation && navigation.goBack();
    };

    return (
        <Screen
            isScroll={false}
            hidden={false}
            backgroundColor={'transparent'}
            forceInset={{ bottom: 'never', top: 'never' }}
        >
            <View style={styles.fullScreen}>
                <CustomHeader
                    navigation={navigation}
                    imgBackground={require('../../../../assets/images/bg_manage_pack.png')}
                    logoLeft={require('../../../../assets/images/icons/Back.png')}
                    onPressLeft={goBack}
                    title={'Manage my pack'}
                />
                <View style={styles.vContent}>
                    <Text style={styles.tTitle}>Estimated delivery :</Text>
                    <Text style={[styles.tTitle, { color: '#000' }]}>20th January</Text>
                    <CustomListManagePack
                        title={'Vitamins'}
                        dataPack={dataList}
                    />
                </View>
            </View>
        </Screen>
    );
}
