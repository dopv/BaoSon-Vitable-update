import React, { useRef, useState } from 'react';
import { View, Text } from 'react-native';
import { Screen } from '../../../library/components/screen/index';
import { HomeHeader } from './components/home-header/HomeHeader';
import { HomeTabs } from './components/home-tabs/HomeTabs';
import { HomeStreakHistory } from './components/home-streak-history/HomeStreakHistory';
import { StreakAccumulation } from './components/home-streak-accumulation/StreakAccumulation';
import { MarkWork } from './components/home-mark-point/MarkPoints';
import { styles } from './style';
import { PACK_SCREEN, QUIZ_SCREEN } from '../../../navigation/TypeScreen';
import { CustomHeader } from '../../../components/header';
import { CustomPage } from '../../../components/page';
import { translate } from '../../../library/utils/i18n/translate';

interface HomePageProps {
    navigation: any,
    route: any
}

export const HomePage = (props: HomePageProps) => {
    const { navigation, route } = props;
    const [tabIndex, setTabIndex] = useState(0);
    const userInfo = route && route.params && route.params.stateAuth
        && route.params.stateAuth.userInfo || {};

    const onGoPack = () => {
        navigation.navigate(PACK_SCREEN)
    }
    const onPressGoToMenu = () => {
        navigation && navigation.openDrawer();
    }
    const onPressGoToQuiz = () => {
        navigation && navigation.navigate(QUIZ_SCREEN);
    }
    return <Screen
        isScroll={false}
        hidden={false}
        backgroundColor={'transparent'}
        forceInset={{ bottom: 'never', top: 'never' }}
        draw={true}
    >
        <View style={styles.fullScreen}>
            <CustomHeader
                isButtonRight={true}
                navigation={navigation}
                onPressRight={onGoPack}
                userName={userInfo && userInfo.email}
                titleButton={translate('AUTHENTIC:HOME:TAKE_THE_QUIZ')}
                onPressTitleButton={onPressGoToQuiz}
                reminder={`It's been two months since you reassessed your needs.`}
                imgBackground={require('../../../../assets/images/Vitable_Hero_Images.png')}
                logoRight={require('../../../../assets/images/Mypack.png')}
                logoLeft={require('../../../../assets/images/Menu.png')}
                onPressLeft={onPressGoToMenu}
            />
            <CustomPage
                navigation={navigation}
                tabIndex={tabIndex}
                setTabIndex={setTabIndex}
                titleLeft={'Daily tracker'}
                titleRight={'Progress'}
                viewPageLeft={
                    <View style={styles.vBot}>
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
                }
                viewPageRight={
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>Progress Screen</Text>
                    </View>

                }
            />
        </View>
    </Screen>

}