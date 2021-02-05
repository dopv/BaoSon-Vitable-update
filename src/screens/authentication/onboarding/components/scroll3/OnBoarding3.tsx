import * as React from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { OnBoarding4 } from '../scroll4/OnBoarding4';
import { styles } from './styles';
export const OnBoarding3 = () => {
    const [scroll4Display, setScroll4Display] = React.useState(false);

    const onPressToOnBoarding4 = () => {
        setScroll4Display(true);
    }
    return (
        <View>
            {!scroll4Display ?
                <View>
                    <View style={styles.viewBackGround1}>
                        <View style={styles.viewTitle}>
                            <Text
                                style={styles.textTitle}
                            >Manage your pack</Text>
                        </View>
                        <View style={styles.viewContent}>
                            <Text
                                style={styles.textContent}
                            >
                                Browse, add and remove products easily. You can also track, delay or pause orders at any time.
                    </Text>
                        </View>
                        <View style={styles.viewImage2}>

                        </View>
                    </View>

                    <ImageBackground
                        style={styles.viewImage1}
                        source={require('../../../../../../assets/images/onboarding/03-Pack-05-Detail1.png')}
                        resizeMode='stretch'
                    >

                    </ImageBackground>
                    <ImageBackground
                        style={styles.viewImage2}
                        source={require('../../../../../../assets/images/onboarding/imagePack2.png')}
                        resizeMode='stretch'
                    >

                    </ImageBackground>

                    <View style={styles.viewBackGround2}>
                        <View style={styles.viewPaging}>
                            <View style={styles.paggingDisable}></View>
                            <View style={styles.paggingDisable}></View>
                            <View style={styles.paggingEnable}></View>
                            <View style={styles.paggingDisable}></View>
                        </View>
                        <TouchableOpacity
                            style={styles.viewButton}
                            onPress={onPressToOnBoarding4}
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
                </View> : <OnBoarding4 />
            }
        </View>
    );
}