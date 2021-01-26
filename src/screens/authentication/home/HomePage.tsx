import React, { useRef, useState } from 'react';
import { View, Text } from 'react-native';
import { Screen } from '../../../library/components/screen/index';
import { HomeHeader } from './components/home-header/HomeHeader';
import { HomeTabs } from './components/home-tabs/HomeTabs';
import { HomeStreakHistory } from './components/home-streak-history/HomeStreakHistory';
import { StreakAccumulation } from './components/home-streak-accumulation/StreakAccumulation';
import { MarkWork } from './components/home-mark-point/MarkPoints';
import { styles } from './style';
import ViewPager from '@react-native-community/viewpager';

interface HomePageProps {
    navigation: any
}

export const HomePage = (props: HomePageProps) => {
    const { navigation } = props;
    const [tabIndex, setTabIndex] = useState(0);
    const _viewPager = useRef(null);

    const _onScrollEnd = (event: any) => {
        let index = event.nativeEvent.position;
        setTabIndex(index);
    };
    const onChangeTab = (index: 0) => {
        setTabIndex(index);
        if (_viewPager && _viewPager.current) {
            _viewPager.current.setPage(index);
        }
    };
    return <Screen
        isScroll={false}
        hidden={false}
        backgroundColor={'transparent'}
        forceInset={{ bottom: 'never', top: 'never' }}
        draw={true}
    >
        <View style={styles.vContent}>
            <HomeHeader
                userName={`aimee`}
                reminder={`It's been two months since you reassessed your needs.`}
                navigation={navigation}
            />
            <View style={styles.vBot}>
                <HomeTabs
                    onChangeTab={onChangeTab}
                    tabIndex={tabIndex} />
                <ViewPager
                    scrollEnabled={false}
                    ref={_viewPager}
                    onPageSelected={_onScrollEnd}
                    style={styles.viewPager}
                    initialPage={0}>
                    <View key="0" style={styles.dailyScreen}>
                        <HomeStreakHistory
                            bestStreak={`32 days`}
                            currentStreak={`7 days`}
                        />
                        <StreakAccumulation
                            conditionPoint={`10,000`}
                            currentPoint={`8,000`}
                        />
                        <MarkWork
                            incPoint={`200`}
                        />
                    </View>
                    <View key="1">
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>Progress Screen</Text>
                        </View>
                    </View>

                </ViewPager>
            </View>
           

        </View>
    </Screen>

}