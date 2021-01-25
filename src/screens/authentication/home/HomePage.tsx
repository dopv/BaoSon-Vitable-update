import React from 'react';
import { Dimensions, Image, ImageBackground, Text, View, TouchableWithoutFeedback } from 'react-native';
import { Screen } from '../../../library/components/screen/index';
import { FONT_10, FONT_12, FONT_14, FONT_18, FONT_24 } from '../../../themes/fontSize';

const { width, height } = Dimensions.get('window');

interface HomePageProps {
    navigation: any
}

export const HomePage = (props: HomePageProps) => {
    const { navigation } = props;

    const onPressGoToMenu = () => {
        navigation && navigation.navigate('Menu');
    }

    return <Screen
        isScroll={false}
        hidden={false}
        backgroundColor={'transparent'}
        forceInset={{ bottom: 'never', top: 'never' }}
        draw={true}
    >
        <View style={{
            flex: 1,
            backgroundColor: '#F7F4EB'
        }}>
            <ImageBackground
                source={require('../../../../assets/images/Vitable_Hero_Images.png')}
                style={{ width: width, height: height * 0.3328, flex: 1 }}
                resizeMode='stretch'
            >
                <TouchableWithoutFeedback onPress={onPressGoToMenu}
                    style={{
                        zIndex: 2
                    }}
                >
                    <Image
                        source={require('../../../../assets/images/Menu.png')}
                        style={{
                            position: 'absolute',
                            width: width * 0.075,
                            height: height * 0.042253,
                            top: height * 0.074,
                            left: width * 0.05
                        }}
                    />
                </TouchableWithoutFeedback>
                <Image
                    source={require('../../../../assets/images/Mypack.png')}
                    style={{
                        position: 'absolute',
                        width: width * 0.33125,
                        height: height * 0.09155,
                        top: height * 0.06162,
                        left: width * 0.66875,
                    }}
                />
                <View
                    style={{
                        width: width * 0.9,
                        height: height * 0.1742958,
                        position: 'absolute',
                        top: height * 0.13028,
                        alignSelf: 'center'
                    }}
                >
                    <View>
                        <Text
                            style={{
                                textAlign: 'center',
                                letterSpacing: FONT_14 * 0.015,
                                fontSize: FONT_14,
                                fontWeight: '400',
                                lineHeight: FONT_14 * 1.3,
                                paddingTop: height * 0.00704,
                                paddingLeft: height * 0.00704
                            }}
                        >
                            Hi, aimee,
                        </Text>
                    </View>
                    <View>
                        <Text
                            style={{
                                textAlign: 'center',
                                fontSize: FONT_14,
                                lineHeight: FONT_14 * 1.3,
                                paddingTop: height * 0.00704,
                                letterSpacing: FONT_14 * 0.015,
                                left: 0
                            }}
                        >
                            It's been two months since you reassessed your needs.
                        </Text>
                    </View>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: FONT_14,
                            lineHeight: FONT_14 * 1.3,
                            paddingTop: height * 0.00704,
                            paddingLeft: height * 0.00704,
                            position: 'absolute',
                            top: height * 0.13204,
                            alignSelf: 'center',
                            color: '#F5785A',
                            letterSpacing: FONT_14 * 0.01857,
                            textDecorationColor: '#F5785A',
                            textDecorationStyle: 'solid',
                            textDecorationLine: 'underline'
                        }}
                    >
                        Take the quizz
                        </Text>
                </View>
            </ImageBackground>
            <View style={{
                width: width,
                position: 'absolute',
                top: height * 0.3327465,
                flexDirection: 'row'
            }}>
                <View
                    style={{
                        width: width / 2
                    }}
                >
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: FONT_14,
                            lineHeight: FONT_14 * 1.3,
                            letterSpacing: FONT_14 * 0.015,
                            color: '#272626',
                            paddingTop: height * 0.0176056,
                            paddingBottom: height * 0.0176056
                        }}
                    >
                        Daily tracker
                    </Text>
                </View>
                <View
                    style={{
                        width: width / 2
                    }}
                >
                    <Text
                        style={{
                            backgroundColor: '#DCD2BD',
                            textAlign: 'center',
                            fontSize: FONT_14,
                            lineHeight: FONT_14 * 1.3,
                            letterSpacing: FONT_14 * 0.015,
                            color: '#272626',
                            paddingTop: height * 0.0176056,
                            paddingBottom: height * 0.0176056
                        }}
                    >
                        Progress
                    </Text>
                </View>
            </View>
            <View
                style={{
                    width: width * 0.6625,
                    top: height * 0.4419014,
                    position: 'absolute'
                }}
            >
                <View
                    style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: 0,
                        width: width * 0.2625,
                        top: 0,
                        left: width * 0.15625
                    }}
                >
                    <Text
                        style={{
                            fontSize: FONT_18,
                            lineHeight: FONT_18 * 1.3,
                            textAlign: 'center',
                            letterSpacing: FONT_18 * 0.0038889,
                            color: '#637C5A',
                            paddingBottom: height * 0.00704
                        }}
                    >
                        7 days
                    </Text>
                    <View
                        style={{
                            width: width * 0.15,
                            height: 0,
                            borderStyle: 'solid',
                            borderTopWidth: 1,
                            borderColor: '#BED0A2',
                            flexGrow: 0,
                            marginTop: 4,
                            marginBottom: 4
                        }}
                    />
                    <Text
                        style={{
                            width: width * 0.2625,
                            textAlign: 'center',
                            fontSize: FONT_12,
                            lineHeight: FONT_12 * 1.833333,
                            letterSpacing: FONT_12 * 0.0175,
                            color: 'black'
                        }}
                    >
                        Current streak
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: 0,
                        width: width * 0.225,
                        left: width * 0.59375,
                        top: 0,
                        position: 'absolute'
                    }}
                >
                    <Text
                        style={{
                            fontSize: FONT_18,
                            lineHeight: FONT_18 * 1.3,
                            textAlign: 'center',
                            letterSpacing: FONT_18 * 0.0038889,
                            color: '#637C5A',
                            paddingBottom: height * 0.00704
                        }}
                    >
                        32 days
                    </Text>
                    <View
                        style={{
                            width: width * 0.15,
                            height: 0,
                            borderStyle: 'solid',
                            borderTopWidth: 1,
                            borderColor: '#BED0A2',
                            flexGrow: 0,
                            marginTop: 4,
                            marginBottom: 4
                        }}
                    />
                    <Text
                        style={{
                            width: width * 0.2625,
                            textAlign: 'center',
                            fontSize: FONT_12,
                            lineHeight: FONT_12 * 1.833333,
                            letterSpacing: FONT_12 * 0.0175,
                            color: 'black'
                        }}
                    >
                        Best streak
                    </Text>
                </View>
            </View>
            <View
                style={{
                    width: width * 0.85,
                    height: height * 0.22535,
                    top: height * 0.579225,
                    position: 'absolute',
                    left: width * 0.075,
                    borderRadius: 3,
                    padding: 16,
                    borderColor: '#BED0A2',
                    borderStyle: 'solid',
                    borderWidth: 1
                }}
            >
                <View
                    style={{
                        width: width * 0.475,
                        height: height * 0.091549,
                        padding: 0,

                    }}
                >
                    <View
                        style={{
                            width: width * 0.6625,
                            height: height * 0.05633,
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: '400',
                                fontSize: FONT_24,
                                lineHeight: FONT_24 * 1.3,
                                letterSpacing: FONT_24 * 0.00375,
                                color: '#637C5A'
                            }}
                        >
                            8000
                        <Text
                                style={{
                                    fontWeight: '400',
                                    fontSize: FONT_14,
                                    lineHeight: FONT_14 * 1.3,
                                    letterSpacing: FONT_14 * 0.015,
                                }}
                            >
                                points
                        </Text>
                        </Text>
                    </View>
                    <View
                        style={{
                            width: width * 0.503125,
                            left: 0
                        }}
                    >
                        <Text
                            style={{
                                fontSize: FONT_12,
                                lineHeight: FONT_12 * 1.83333333,
                                letterSpacing: FONT_12 * 0.0175,
                                color: 'black'
                            }}
                        >
                            /10,000 points
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        width: width * 0.225,
                        height: width * 0.225,
                        position: 'absolute',
                        left: width * 0.575,
                        right: 0,
                        top: height * 0.028169,
                        opacity: 0.3,
                        borderColor: '#272626',
                        borderWidth: 1,
                        borderStyle: 'solid',
                        borderRadius: 50,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <View
                        style={{
                            width: width * 0.175,
                            height: height * 0.068662,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Image
                            source={require('../../../../assets/images/tags-labels.png')}
                            style={{
                                width: width * 0.075,
                                height: width * 0.075
                            }}
                        />
                        <Text
                            style={{
                                fontWeight: '500',
                                fontSize: FONT_10,
                                lineHeight: FONT_10 * 1.5,
                                letterSpacing: FONT_10 * 0.021,
                                textAlign: 'center'
                            }}
                        >
                            Get - 10$
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        width: width * 0.475,
                        height: width * 0.0125,
                        backgroundColor: '#BED0A2',
                        marginTop: height * 0.014085,
                        borderRadius: 8,
                    }}
                >
                    <View
                        style={{
                            width: width * 0.3,
                            borderRadius: 8,
                            backgroundColor: '#637C5A',
                            height: width * 0.0125
                        }}
                    />
                </View>
                <Text
                    style={{
                        width: width * 0.475,
                        fontSize: FONT_12,
                        lineHeight: FONT_12 * 1.8333333,
                        letterSpacing: FONT_12 * 0.021666666,
                        paddingTop: height * 0.0140845,
                        textDecorationStyle: 'solid',
                        textDecorationLine: 'underline',
                        textDecorationColor: '#a9a7a1'
                    }}
                >
                    Earn extra points
                </Text>
            </View>
            <View
                style={{
                    width: width * 0.85,
                    height: height * 0.1161972,
                    top: height * 0.846831,
                    left: width * 0.075,
                    padding: 0,
                    position: 'absolute'
                }}
            >
                <View
                    style={{
                        width: width * 0.734375,
                        left: width * 0.0578125,
                        borderWidth: 0.5,
                        borderStyle: 'solid',
                        borderColor: '#272626',
                        backgroundColor: '#F5785A',
                        alignItems: 'center'
                    }}
                >
                    <Text
                        style={{
                            paddingHorizontal: height * 0.042254,
                            paddingVertical: height * 0.014085,
                            fontSize: FONT_14,
                            fontWeight: '400',
                            lineHeight: FONT_14 * 1.5714,
                            letterSpacing: FONT_14 * 0.015
                        }}
                    >
                        I’ve taken my vitamins today
                    </Text>
                </View>
                <Text
                    style={{
                        fontWeight: '400',
                        fontSize: FONT_12,
                        lineHeight: FONT_12 * 1.8333333,
                        letterSpacing: FONT_12 * 0.0175,
                        textAlign: 'center',
                        color: '#F5785A',
                        paddingVertical: height * 0.00704
                    }}
                >
                    + 200 points
                </Text>
            </View>
        </View>
    </Screen>

}