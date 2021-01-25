import React from "react";
import {
    View, Image
} from "react-native"
import { Screen } from "../../../library/components/screen";
import { styles } from "./style";

export const Splash = () => {
    return (
        <Screen
            isScroll={false}
            hidden={false}
            backgroundColor={'#fff'}
            forceInset={{ bottom: 'never', top: 'never' }}
        >
            <View style={styles.fullScreen}>
                <View style={styles.vContent}>
                    <Image
                        style={styles.logoImage}
                        source={require('../../../../assets/images/Logo.png')}
                        resizeMode='stretch'
                    />
                </View>
            </View>
        </Screen>
    )
}