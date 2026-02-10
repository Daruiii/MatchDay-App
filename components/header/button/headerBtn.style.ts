import { StyleSheet, ViewStyle, ImageStyle } from 'react-native';
import { COLORS, SIZES } from '@constants';

const staticStyles = StyleSheet.create({
  btnContainer: {
    width: 30,
    height: 30,
    borderRadius: SIZES.small,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const dynamicStyles = {
  btnImg: (dimension: number): ImageStyle => ({
    width: dimension,
    height: dimension,
    tintColor: COLORS.white,
  }),
};

export default { ...staticStyles, ...dynamicStyles };
