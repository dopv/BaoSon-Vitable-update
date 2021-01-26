import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Platform,
  Dimensions,
  Image,
  Modal
} from 'react-native';
import PropTypes from 'prop-types';
import R from '../../../../assets/value';
import { FONT_16 } from '../../../themes/fontSize';

const { width } = Dimensions.get('window');
export function ProcessDialog(props: any) {
  const [delay, setDelay] = useState(false)
  const { visible, message } = props;

  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        setDelay(false)
      }, 1000)
    } else {
      setDelay(true)
    }
  }, [visible])
  return (
    <Modal
      visible={delay}
      animated={true}
      animationType={'none'}
      transparent={true}>
      <View style={[styles.contentModal]}>
        <View
          style={styles.wrapDialogColumn}>

          <Image
            style={{ width: 60, height: 60 }}
            source={require('../../../assets/icon/ic_loadding.gif')}
            resizeMode={'contain'}
          />

        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  contentModal: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textMsg: {
    color: '#FFFFFF',
    fontSize: FONT_16,
    marginLeft: 10,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: R.fonts && R.fonts.ROBOTO_SEMIBOLD,
  },
  textMsgIOS: {
    color: '#FFFFFF',
    fontSize: FONT_16,
    marginTop: 10,
    marginLeft: 10,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: R.fonts && R.fonts.ROBOTO_SEMIBOLD,
  },
  row: { flexDirection: 'row' },
  column: {
    flexDirection: 'column',
  },
  wrapDialogRow: {
    width: width - 32,
    flexDirection: 'row',
    borderRadius: 5,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'rgba(0,0,0,.40)',
  },
  wrapDialogColumn: {
    padding: 20,
    overflow: 'hidden',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.40)',
  },
});

ProcessDialog.prototype = {
  visible: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};
