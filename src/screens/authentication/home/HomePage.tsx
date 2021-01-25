import React from 'react';
import { View } from 'react-native';
import { Screen } from '../../../library/components/screen/index';
import { HomeHeader } from './components/home-header/HomeHeader';
import { HomeTabs } from './components/home-tabs/HomeTabs';
import { HomeStreakHistory } from './components/home-streak-history/HomeStreakHistory';
import { StreakAccumulation } from './components/home-streak-accumulation/StreakAccumulation';
import { MarkWork } from './components/home-mark-point/MarkPoints';
import { styles } from './style';

interface HomePageProps {
    navigation: any
}

export const HomePage = (props: HomePageProps) => {

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
            />
            <HomeTabs />
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
    </Screen>

}