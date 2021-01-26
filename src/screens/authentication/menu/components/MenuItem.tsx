import React from 'react';
import { Dimensions, Image, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { styles } from './styles';

const { width, height } = Dimensions.get('window');

interface ItemMenuProps {
    name: string,
    isActive: boolean,
    route: string,
    navigation: any,
}

export const ItemMenu = (props: ItemMenuProps) => {
    const { name, isActive, route, navigation } = props;

    const onPressGoto = () => {
        navigation && navigation.navigate(route);
    }

    return <TouchableOpacity
        style={styles.btnItem}
        onPress={() => onPressGoto()}
    >
        <>
            <Text
                allowFontScaling={false}
                style={[styles.vMenuItem, isActive ?
                    styles.vItemActive : styles.vItemNormal]}
            >
                {name}
            </Text>
            <Image
                source={require('../../../../../assets/images/Arrow_Right.png')}
                style={{
                    width: width * 0.04,
                    height: width * 0.06,
                    position: 'absolute',
                    // top: height * 0.0176056,
                    right: width * 0.1
                }}
            />
        </>
    </TouchableOpacity>
}