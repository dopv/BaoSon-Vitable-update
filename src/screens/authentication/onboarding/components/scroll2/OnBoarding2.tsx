import * as React from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { OnBoarding3 } from '../scroll3/OnBoarding3';
import { styles } from './styles';
export const OnBoarding2 = () => {
    const [scroll3Display, setScroll3Display] = React.useState(false);

    const onPressToOnBoarding3 = () => {
        setScroll3Display(true);
    }
    return (
        <View>
            {!scroll3Display ?
                <View>
                    <View style={styles.viewBackGround1}>
                        <View style={styles.viewTitle}>
                            <Text
                                style={styles.textTitle}
                            >See your progress</Text>
                        </View>
                        <View style={styles.viewContent}>
                            <Text
                                style={styles.textContent}
                            >
                                Set yourself up for success by tracking your progress. Get a tailored guidance towards your goals.
                    </Text>
                        </View>
                        <View style={styles.viewImage2}>

                        </View>
                    </View>

                    <ImageBackground
                        style={styles.viewImage1}
                        source={require('../../../../../../assets/images/onboarding/02-Progress1.png')}
                        resizeMode='stretch'
                    >

                    </ImageBackground>
                    <ImageBackground
                        style={styles.viewImage2}
                        source={require('../../../../../../assets/images/onboarding/02-Progress2.png')}
                        resizeMode='stretch'
                    >

                    </ImageBackground>

                    <View style={styles.viewBackGround2}>
                        <View style={styles.viewPaging}>
                            <View style={styles.paggingDisable}></View>
                            <View style={styles.paggingEnable}></View>
                            <View style={styles.paggingDisable}></View>
                            <View style={styles.paggingDisable}></View>
                        </View>
                        <TouchableOpacity
                            style={styles.viewButton}
                            onPress={onPressToOnBoarding3}
                        >
                            <Text
                                style={styles.textButton}
                            >Next
                    </Text>
                            <Image
                                style={styles.imageButtom}
                                source={require('../../../../../../assets/images/onboarding/layer1.png')}
                            >
                            </Image>
                        </TouchableOpacity>
                    </View>
                </View> : <OnBoarding3 />
            }
        </View>
    );
}