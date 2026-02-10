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
  container: (secondColor: string, eventColor: string): ViewStyle => ({
    width: Dimensions.get('window').width / 3.75,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: eventColor,
    borderRadius: 10,
    padding: 10,
    borderColor: secondColor,
    borderWidth: 1 / 3,
  }),
  headText: (color: string): TextStyle => ({
    color: color,
    fontSize: SIZES.xSmall,
    fontFamily: 'RogueHero2',
    marginTop: 20,
    textAlign: 'center',
    width: 90,
    height: 40,
  }),
};

export default { ...staticStyles, ...dynamicStyles };
