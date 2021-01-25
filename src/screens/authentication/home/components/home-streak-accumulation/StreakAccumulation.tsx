import React from 'react';
import { Image, Text, View } from 'react-native';
import { translate } from '../../../../../library/utils/i18n/translate';
import { styles } from './styles'


interface StreakAccumulationProps {
    currentPoint: string,
    conditionPoint: string
}

export const StreakAccumulation = (props: StreakAccumulationProps) => {
    const { conditionPoint, currentPoint } = props;
    return <View
        style={styles.vStreakAccumu}
    >
        <View
            style={styles.vPointInfo}
        >
            <View
                style={styles.vCurrentPoint}
            >
                <Text
                    style={styles.sTextPoints}
                >
                    {currentPoint || '0'}
                    <Text
                        style={styles.sTextPointUnit}
                    >
                        {translate('AUTHENTIC:STREAK_ACCUMULATION:POINT')}
                    </Text>
                </Text>
            </View>
            <View
                style={styles.vPointCondition}
            >
                <Text
                    style={styles.sTextPointCondition}
                >
                    {translate('AUTHENTIC:STREAK_ACCUMULATION:SPLASH')}{conditionPoint || '0'} {translate('AUTHENTIC:STREAK_ACCUMULATION:POINT')}
                </Text>
            </View>
        </View>
        <View
            style={styles.vContentReward}
        >
            <View
                style={styles.vReward}
            >
                <Image
                    source={require('../../../../../../assets/images/tags-labels.png')}
                    style={styles.sImgTags}
                />
                <Text
                    style={styles.sTextGet}
                >
                    Get - 10$
            </Text>
            </View>
        </View>
        <View
            style={styles.vProcess}
        >
            <View
                style={styles.vCurrentProcess}
            />
        </View>
        <Text
            style={styles.sTextEarnExtra}
        >
            {translate('AUTHENTIC:STREAK_ACCUMULATION:EARN_EXTRA_POINTS')}
        </Text>
    </View>
}