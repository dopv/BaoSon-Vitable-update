import * as React from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { Screen } from '../../../library/components/screen';
import { OnBoarding1 } from './components/scroll1/OnBoarding1';
import { styles } from './styles';
export const OnBoarding = () => {
    const [scroll1Display, setScroll1Display] = React.useState(false);

    const onPressToOnBoarding1 = () => {
        setScroll1Display(true);
    }

    return (
        <Screen
            isScroll={false}
            hidden={false}
            backgroundColor={'transparent'}
            forceInset={{ bottom: 'never', top: 'never' }}
            draw={true}
        >
            {!scroll1Display ?
                <View>
                    <ImageBackground
                        source={require('../../../../assets/images/onboarding/Vitable_HeroImages_341.png')}
                        style={styles.vBackground}
                        resizeMode='stretch'
                    >
                        <View style={styles.viewTextDearAime}>
                            <View >
                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: "center",
                                }}>
                                    <Text style={styles.textDear}>Dear</Text>
                                </View>
                            </View>
                            <View style={styles.textAime}>
                                <Image
                                    source={require('../../../../assets/images/onboarding/Aimee.png')}
                                >
                                </Image>
                            </View>

                        </View>
                        <View style={styles.viewTextContent}>
                            <Text style={styles.textContent} >
                                Your health is your most precious gift, so we created the easiest way to keep your health routine going.
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={styles.buttonStarted}
                            onPress={onPressToOnBoarding1}
                        >

                            <Text
                                style={styles.textButton}
                                allowFontScaling={false}
                            >Let’s get you started
                        </Text>
                        </TouchableOpacity>
                    </ImageBackground>

                </View> :
                <OnBoarding1 />
            }
        </Screen>
    );
}
