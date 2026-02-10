import { StyleSheet, ImageStyle } from 'react-native';
import { COLORS, SIZES } from '@constants';

const staticStyles = StyleSheet.create({
  btnContainer: {
    width: 30,
    height: 30,
    backgroundColor: COLORS.whiteTR,
    borderRadius: SIZES.small,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 1,
  },
});

const dynamicStyles = {
  btnImg: (dimension: number): ImageStyle => ({
    width: dimension,
    height: dimension,
  }),
};

export default { ...staticStyles, ...dynamicStyles };
