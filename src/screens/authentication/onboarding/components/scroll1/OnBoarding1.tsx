import * as React from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { OnBoarding2 } from '../scroll2/OnBoarding2';
import { styles } from './styles';
export const OnBoarding1 = () => {
    const textTit =
        `Stay on top of
your health routine`;
    const [scroll2Display, setScroll2Display] = React.useState(false);

    const onPressToOnBoarding2 = () => {
        setScroll2Display(true);
    }
    return (
        <View>
            {!scroll2Display ?
                <View>
                    <View style={styles.viewBackGround1}>
                        <View style={styles.viewTitle}>
                            <Text
                                style={styles.textTitle}
                            >{textTit}</Text>
                        </View>
                        <View style={styles.viewContent}>
                            <Text
                                style={styles.textContent}
                            >
                                Track your daily routine. Earn rewards. Support your health. Every day.
                    </Text>
                        </View>
                        <View style={styles.viewImage2}>

                        </View>
                    </View>

                    <ImageBackground
                        style={styles.viewImage1}
                        source={require('../../../../../../assets/images/onboarding/image1.png')}
                        resizeMode='stretch'
                    >

                    </ImageBackground>
                    <ImageBackground
                        style={styles.viewImage2}
                        source={require('../../../../../../assets/images/onboarding/image2.png')}
                        resizeMode='stretch'
                    >

                    </ImageBackground>

                    <View style={styles.viewBackGround2}>
                        <View style={styles.viewPaging}>
                            <View style={styles.paggingEnable}></View>
                            <View style={styles.paggingDisable}></View>
                            <View style={styles.paggingDisable}></View>
                            <View style={styles.paggingDisable}></View>
                        </View>
                        <TouchableOpacity
                            style={styles.viewButton}
                            onPress={onPressToOnBoarding2}
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
                </View> : <OnBoarding2 />
            }
        </View>
    );
}