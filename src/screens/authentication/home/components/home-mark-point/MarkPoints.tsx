import React from 'react';
import { Text, View } from 'react-native';
import { translate } from '../../../../../library/utils/i18n/translate';
import { styles } from './styles'

interface MarkWorkProps {
    incPoint: string
}

export const MarkWork = (props: MarkWorkProps) => {
    const { incPoint } = props;
    return <View
        style={styles.vMarkPoint}
    >
        <View
            style={styles.vMarkBtn}
        >
            <Text
                allowFontScaling={false}
                style={styles.sTextMarkBtn}
            >
                {translate('AUTHENTIC:MARK_POINTS:TAKEN_VITAMIN_TODAY')}
            </Text>
        </View>
        <Text
            allowFontScaling={false}
            style={styles.sTextMarkPoint}
        >

            {translate('AUTHENTIC:MARK_POINTS:PLUS')} {incPoint || '0'} {translate('AUTHENTIC:MARK_POINTS:POINT')}
        </Text>
    </View>
}