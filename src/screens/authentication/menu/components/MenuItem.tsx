import React from 'react';
import { Dimensions, Image, Text, TouchableWithoutFeedback, TouchableOpacity, View } from 'react-native';
import { size } from '../../../../themes/size';
import { SvgArrowNext } from '../../../../themes/svg';
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
            <View style={{
                position: 'absolute',
                // top: height * 0.0176056,
                right: width * 0.1
            }}>
                <SvgArrowNext viewBox={`0 0 ${size[14]} ${size[22]}`}/>
            </View>
           
        </>
    </TouchableOpacity>
}