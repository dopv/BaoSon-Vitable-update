import React, { useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { translate } from '../../../../../library/utils/i18n/translate';
import { styles } from './styles'
import ViewPager from '@react-native-community/viewpager';


interface HomeTabsProps {
    onChangeTab: Function,
    tabIndex: number
}

export const HomeTabs = (props: HomeTabsProps) => {
    const { onChangeTab, tabIndex } = props

    return <View style={styles.vHomeTabs}>
        <TouchableOpacity
            onPress={() => {onChangeTab && onChangeTab(0)}}
            style={styles.vTabsLeftRight}
        >
            <Text
                allowFontScaling={false}
                style={tabIndex === 0 ? styles.sTitleTracker : styles.sTitleProgress}
            >
                {translate('AUTHENTIC:HOME:DAILY_TRACKER') || ""}
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => {onChangeTab && onChangeTab(1)}}
            style={styles.vTabsLeftRight}
        >
            <Text
                allowFontScaling={false}
                style={tabIndex === 1 ? styles.sTitleTracker : styles.sTitleProgress}
            >
                Progress
            </Text>
        </TouchableOpacity>
    </View>
}