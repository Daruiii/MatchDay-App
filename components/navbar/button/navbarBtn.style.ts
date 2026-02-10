import { StyleSheet, Dimensions, ImageStyle } from 'react-native';
import { SIZES } from '@constants';

const staticStyles = StyleSheet.create({
  btnContainer: {
    width: Dimensions.get('window').width / 6.5,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
});

const dynamicStyles = {
  btnImg: (dimension: number): ImageStyle => ({
    width: dimension,
    height: dimension,
  }),
};

export default { ...staticStyles, ...dynamicStyles };
