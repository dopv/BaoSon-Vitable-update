import React, { useRef } from 'react';
import { Image, ImageBackground, Text, TouchableOpacity, TouchableWithoutFeedback, View, StyleSheet, Dimensions } from 'react-native';
import { translate } from '../library/utils/i18n/translate';
import { useRoute } from '@react-navigation/native';
import { FONT_14 } from '../themes/fontSize';
import { size } from '../themes/size';
import { StatusBarHeight } from '../config/heightStatusbar';
import ViewPager from '@react-native-community/viewpager';

const { width, height } = Dimensions.get('window');

export const CustomPage = (props: any) => {
    const {
        navigation,
        tabIndex,
        titleLeft,
        titleRight,
        setTabIndex,
        title,
        viewPageLeft,
        viewPageRight
    } = props;

    const _viewPager = useRef<ViewPager>(null);

    const onChangeTab = (index: number) => {
        setTabIndex(index);
        _viewPager && _viewPager.current && _viewPager.current.setPage(index);
    };

    const _onScrollEnd = (event: any) => {
        let index = event.nativeEvent.position;
        setTabIndex(index);
    };

    return (
        <View style={styles.vContent}>
            <View style={styles.vTab}>
                <TouchableOpacity
                    onPress={() => { onChangeTab && onChangeTab(0) }}
                    style={tabIndex === 0 ? [styles.vTabsLeftRight, styles.borderPageLeft] : styles.vTabsLeftRight}
                >
                    <Text
                        allowFontScaling={false}
                        style={styles.sTitleTracker}
                    >
                        {titleLeft}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { onChangeTab && onChangeTab(1) }}
                    style={tabIndex === 1 ? [styles.vTabsLeftRight, styles.borderPageRight] : styles.vTabsLeftRight}
                >
                    <Text
                        allowFontScaling={false}
                        style={styles.sTitleTracker}
                    >
                        {titleRight}
                    </Text>
                </TouchableOpacity>
            </View>
            <ViewPager
                scrollEnabled={false}
                ref={_viewPager}
                onPageSelected={_onScrollEnd}
                style={styles.viewPager}
                initialPage={0}>
                <View key="0" style={styles.vPageLeft}>
                    {viewPageLeft}
                </View>
                <View key="1" style={styles.vPageLeft}>
                    {viewPageRight}
                </View>
            </ViewPager>
        </View>
    )
}

const styles = StyleSheet.create({
    vContent: {
        flex: 1,
        backgroundColor: '#F7F4EB',
        // top: -size[30]
        // paddingTop: StatusBarHeight
    },
    vTab: {
        width: width,
        flexDirection: 'row',
        backgroundColor: '#DCD2BD',
    },
    vTabsLeftRight: {
        width: width / 2
    },
    sTitleTracker: {
        textAlign: 'center',
        fontSize: FONT_14,
        lineHeight: FONT_14 * 1.3,
        letterSpacing: FONT_14 * 0.015,
        color: '#272626',
        paddingTop: size[10],
        paddingBottom: size[5]
    },
    borderPageRight: {
        borderTopLeftRadius: size[8],
        zIndex: 2,
        backgroundColor: '#F7F4EB',
        borderBottomWidth: size[10],
        borderColor: '#F7F4EB',
    },
    borderPageLeft: {
        borderTopRightRadius: size[8],
        zIndex: 2,
        backgroundColor: '#F7F4EB',
        borderBottomWidth: size[10],
        borderColor: '#F7F4EB',
    },
    viewPager: {
        flex: 1,
    },
    vPageLeft: {
        flex: 1,
    }

})