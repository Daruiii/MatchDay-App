import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS, SIZES } from '@constants';

const staticStyles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
    marginBottom: 20,
  },
  headerItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const dynamicStyles = {
  container: (secondColor: string): ViewStyle => ({
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    borderBottomColor: secondColor,
    borderBottomWidth: 1 / 2,
    paddingBottom: 20,
  }),
  headText: (textColor: string): TextStyle => ({
    color: textColor,
    fontSize: SIZES.small,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'RogueHero2',
  }),
};

export default { ...staticStyles, ...dynamicStyles };
