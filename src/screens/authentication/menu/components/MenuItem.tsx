import React from 'react';
import { Dimensions, Image, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { styles } from './styles';

const { width, height } = Dimensions.get('window');

interface ItemMenuProps {
    name: string,
    isActive: boolean,
    route: string,
    navigation: any,
    currentRoute: string
}

export const ItemMenu = (props: ItemMenuProps) => {
    const { name, isActive, route, navigation, currentRoute } = props;

    const onPressGoto = () => {
        if (route === currentRoute) return;
        navigation && navigation.navigate(route);
    }

    return <TouchableOpacity
        onPress={() => onPressGoto()}
    >
        <>
            <Text
                style={[styles.vMenuItem, isActive ?
                    styles.vItemActive : styles.vItemNormal]}
            >
                {name}
            </Text>
            <Image
                source={require('../../../../../assets/images/Arrow_Right.png')}
                style={{
                    width: width * 0.03646875,
                    height: height * 0.0352113,
                    position: 'absolute',
                    top: height * 0.0176056,
                    left: width * 0.84490625
                }}
            />
        </>
    </TouchableOpacity>
}