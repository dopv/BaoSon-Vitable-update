import * as React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
export const OnBoardingEnd = () => {
    return (
        <View>
            <View style={styles.viewBackground}>
                <View style={styles.viewTitle}>
                    <Text style={styles.textTitle}>
                        When should we remind you to take your vitamins?
            </Text>
                </View>
                <View style={styles.viewContent1}>
                    <Text
                        style={styles.textContent}
                    >
                        Consistency is key to achieve great results. A friendly reminder once a day will help you stay on track
                    </Text>
                </View>
                <View style={styles.viewContent2}>
                    <Text
                        style={styles.textContent}
                    >
                        Tip: We recommend taking your vitamins after a main meal with water.
                    </Text>
                </View>
                
            </View>
        </View>
    );
}