import React from 'react';
import { Dimensions, Image, TouchableOpacity, Text, View, TouchableWithoutFeedback } from 'react-native';
import { Screen } from '../../../library/components/screen/index';
import { FONT_14, FONT_16, FONT_18 } from '../../../themes/fontSize';

const { width, height } = Dimensions.get('window');

interface MenuProps {
    navigation: any
}

interface PropsItemMenu {
    name: string,
    isActive: boolean
}

const ItemMenu = (props: PropsItemMenu) => {
    const { name, isActive } = props;

    return <View>
        <Text
            style={{
                fontWeight: isActive ? '500' : '400',
                fontSize: FONT_16,
                lineHeight: FONT_16 * 1.375,
                letterSpacing: FONT_16 * 0.0056,
                color: isActive ? '#333333' : '#272626',
                paddingVertical: height * 0.021126,
                paddingLeft: width * 0.075
            }}
        >
            {name}
        </Text>
        <Image
            source={require('../../../../assets/images/Arrow_Right.png')}
            style={{
                width: width * 0.03646875,
                height: height * 0.0352113,
                position: 'absolute',
                top: height * 0.0176056,
                left: width * 0.84490625
            }}
        />
    </View>
}

export const Menu = (props: MenuProps) => {
    const { navigation } = props;

    const goBack = () => {
        navigation && navigation.goBack();
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
            <TouchableWithoutFeedback onPress={goBack}
                style={{
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    zIndex: 2
                }}
            >
                <Image
                    source={require('../../../../assets/images/Close.png')}
                    style={{
                        position: 'absolute',
                        width: width * 0.046875,
                        height: width * 0.046875,
                        top: height * 0.081866,
                        left: width * 0.0640625
                    }}
                />
            </TouchableWithoutFeedback>
            <Image
                source={require('../../../../assets/images/Logo-black.png')}
                style={{
                    position: 'absolute',
                    width: width * 0.075,
                    height: width * 0.075,
                    top: height * 0.07394,
                    left: width * 0.4625
                }}
            />
            <View
                style={{
                    width: width,
                    height: height * 0.565141,
                    position: 'absolute',
                    top: height * 0.1866197,
                    alignItems: 'center',
                    padding: 0
                }}
            >
                <View
                    style={{
                        width: width,
                        height: height * 0.32394,
                        padding: 0,
                        top: 0,
                        left: 0
                    }}
                >
                    <ItemMenu
                        name='Tracking my vitamins'
                        isActive={true}
                    />
                    <ItemMenu
                        name='My pack'
                        isActive={false}
                    />
                    <ItemMenu
                        name='Browse our shop'
                        isActive={false}
                    />
                    <ItemMenu
                        name='My profile'
                        isActive={false}
                    />
                </View>
                <View
                    style={{
                        width: width * 0.85,
                        height: height * 0.0017606,
                        top: height * 0.36619718,
                        backgroundColor: '#DCD2BD',
                        position: 'absolute'
                    }}
                />
                <View
                    style={{
                        height: height * 0.15493,
                        width: width,
                        top: height * 0.4102113,
                        position: 'absolute'
                    }}
                >
                    <ItemMenu
                        name='Support / Help'
                        isActive={false}
                    />
                    <ItemMenu
                        name='Account details'
                        isActive={false}
                    />
                </View>
            </View>
            <View
                style={{
                    width: width,
                    height: height * 0.165493,
                    backgroundColor: '#637C5A',
                    bottom: 0,
                    position: 'absolute',
                    justifyContent: 'center'
                }}
            >
                <View
                    style={{
                        height: height * 0.08099,
                        marginLeft: width * 0.075
                    }}
                >
                    <Text
                        style={{
                            fontSize: FONT_18,
                            fontWeight: '400',
                            lineHeight: FONT_18 * 1.3,
                            letterSpacing: FONT_18 * 0.0038889,
                            color: '#F7F4EB'
                        }}
                    >
                        Want to ajust your plan?
                        </Text>
                    <Text
                        style={{
                            fontSize: FONT_14,
                            fontWeight: '500',
                            lineHeight: FONT_14 * 1.57142,
                            letterSpacing: FONT_14 * 0.0185714,
                            color: '#F2EDE0',
                            textDecorationLine: 'underline'
                        }}
                    >
                        Retake the quiz
                        </Text>
                </View>
            </View>
        </View>
    </Screen>

}