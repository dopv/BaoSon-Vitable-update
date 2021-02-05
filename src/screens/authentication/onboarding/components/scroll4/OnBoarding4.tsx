import * as React from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { OnBoardingEnd } from '../welcomeEnd/OnBoardingEnd';
import { styles } from './styles';
export const OnBoarding4 = () => {
    const [welcomeEndDisplay, setWelcomeEndDisplay] = React.useState(false);

    const onPressToWelcomeEnd = () => {
        setWelcomeEndDisplay(true);
    }
    return (
        <View>
            {!welcomeEndDisplay ?
                <View>
                    <View style={styles.viewBackGround1}>
                        <View style={styles.viewTitle}>
                            <Text
                                style={styles.textTitle}
                            >Learn more about your vitamins</Text>
                        </View>
                        <View style={styles.viewContent}>
                            <Text
                                style={styles.textContent}
                            >
                                Because we know how important it is to know what your vitamins are made of and how they work.
                    </Text>
                        </View>
                        <View style={styles.viewImage2}>

                        </View>
                    </View>

                    <ImageBackground
                        style={styles.viewImage1}
                        source={require('../../../../../../assets/images/onboarding/image3.png')}
                        resizeMode='stretch'
                    >

                    </ImageBackground>
                    <ImageBackground
                        style={styles.viewImage2}
                        source={require('../../../../../../assets/images/onboarding/image4.png')}
                        resizeMode='stretch'
                    >

                    </ImageBackground>

                    <View style={styles.viewBackGround2}>
                        <View style={styles.viewPaging}>
                            <View style={styles.paggingDisable}></View>
                            <View style={styles.paggingDisable}></View>
                            <View style={styles.paggingDisable}></View>
                            <View style={styles.paggingEnable}></View>
                        </View>
                        <TouchableOpacity
                            style={styles.viewButton}
                            onPress={onPressToWelcomeEnd}
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
                </View> : <OnBoardingEnd />
            }
        </View>
    );
}