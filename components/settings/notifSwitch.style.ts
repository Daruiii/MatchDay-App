import { StyleSheet, ImageStyle } from 'react-native';
import { COLORS, SIZES } from '@constants';

const staticStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  headText: {
    color: COLORS.gray,
    fontSize: SIZES.medium,
    fontFamily: 'RogueHero2',
  },
});

const dynamicStyles = {
  btnImg: (dimension: number): ImageStyle => ({
    width: dimension,
    height: dimension,
  }),
};

export default { ...staticStyles, ...dynamicStyles };
