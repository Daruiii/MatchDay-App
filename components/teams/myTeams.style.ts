import { StyleSheet, Dimensions, ViewStyle, TextStyle } from 'react-native';
import { COLORS, SIZES } from '@constants';

const staticStyles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
  },
  contextText: {
    fontSize: SIZES.medium - 2,
    color: COLORS.gray,
    marginVertical: SIZES.small / 1.25,
  },
  scrollContainer: {
    backgroundColor: COLORS.gray2,
    height: '100%',
    marginLeft: 10,
  },
});

const dynamicStyles = {
  container: (backgroundColor: string): ViewStyle => ({
    marginBottom: SIZES.large,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: backgroundColor,
    borderRadius: SIZES.xSmall,
    padding: SIZES.medium,
    width: Dimensions.get('window').width - 40,
    height: 60,
  }),
  headText: (color: string): TextStyle => ({
    fontSize: SIZES.ssMedium,
    color: color,
    fontWeight: 'bold',
    fontFamily: 'RogueHero2',
  }),
};

export default { ...staticStyles, ...dynamicStyles };
