import { ViewStyle, TextStyle } from 'react-native';
import { COLORS, SIZES } from '@constants';

const styles = {
  btnContainer: (activated: boolean): ViewStyle => ({
    width: 'auto',
    height: 30,
    backgroundColor: activated ? COLORS.success : COLORS.btnBg,
    borderRadius: SIZES.small / 1.25,
    justifyContent: 'space-between',
    padding: SIZES.xxSmall,
    alignItems: 'center',
    margin: SIZES.xxSmall,
    display: 'flex',
    flexDirection: 'row',
  }),
  text: (activated: boolean): TextStyle => ({
    color: activated ? COLORS.white : COLORS.black,
    fontSize: SIZES.small,
    fontFamily: 'RogueHero2',
    margin: SIZES.xxSmall,
  }),
};

export default styles;
