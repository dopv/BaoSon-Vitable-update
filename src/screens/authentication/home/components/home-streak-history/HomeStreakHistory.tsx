import React from 'react';
import { Text, View } from 'react-native';
import { translate } from '../../../../../library/utils/i18n/translate';
import { styles } from './styles'


interface HomeStreakHistoryProps {
    currentStreak: string,
    bestStreak: string
}

export const HomeStreakHistory = (props: HomeStreakHistoryProps) => {
    const { currentStreak, bestStreak } = props;
    return <View
        style={styles.vStreakHistory}
    >
        <View
            style={styles.vStreakCurrent}
        >
            <Text
                style={styles.sTextStreakCurrent}
            >
                {currentStreak || ''}
            </Text>
            <View
                style={styles.vSubStreakCurrent}
            />
            <Text
                style={styles.vTextSubStreakCurrent}
            >
                {translate('AUTHENTIC:HOME_STREAK_HISTORY:CURRENT_STREAK')}
            </Text>
        </View>
        <View
            style={styles.vStreakBest}
        >
            <Text
                style={styles.sTextStreakBest}
            >
                {bestStreak || ''}
            </Text>
            <View
                style={styles.vSubStreakBest}
            />
            <Text
                style={styles.sTextSubStreakBest}
            >
                {translate('AUTHENTIC:HOME_STREAK_HISTORY:BEST_STREAK')}
            </Text>
        </View>
    </View>
}