import React from 'react';
import { Text, View } from 'react-native';
import { translate } from '../../../../../library/utils/i18n/translate';
import { styles } from './styles'


interface HomeTabsProps {

}

export const HomeTabs = (props: HomeTabsProps) => {

    return <View style={styles.vHomeTabs}>
        <View
            style={styles.vTabsLeftRight}
        >
            <Text
                style={styles.sTitleTracker}
            >
                {translate('AUTHENTIC:HOME:DAILY_TRACKER') || ""}
            </Text>
        </View>
        <View
            style={styles.vTabsLeftRight}
        >
            <Text
                style={styles.sTitleProgress}
            >
                Progress
            </Text>
        </View>
    </View>
}