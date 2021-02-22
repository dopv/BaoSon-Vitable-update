import * as React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';

export const ItemOnBoarding = (props: any) => {
    const { item, index } = props;

    return (
        <View style={styles.vFullscreen}>
            <View style={styles.viewBackGround1}>
                <View style={styles.viewTitle}>
                    <Text
                        style={styles.textTitle}
                    >{item.title}</Text>
                </View>
                <View style={styles.viewContent}>
                    <Text style={styles.textContent}>
                        {item.content}
                    </Text>
                </View>

            </View>
            <Image
                style={index == 2 ? styles.vImageIndex2 : styles.viewImage1}
                source={item.image}
                resizeMode='contain'
            />
            <View style={styles.vBottomItem}/>
            
        </View>
    );
}