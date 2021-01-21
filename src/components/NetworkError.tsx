import React from 'react';
import { Modal, Text, View } from 'react-native';
import { styles } from './style';

export const NetworkError = () => {
    return <View>
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text allowFontScaling={false} style={styles.textConfirm}>Please check your internet connection...</Text>
                </View>
            </View>
        </Modal>
        {/* } */}
    </View>

}