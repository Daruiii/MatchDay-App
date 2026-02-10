import { ViewStyle, TextStyle } from 'react-native';
import { COLORS, SIZES } from '@constants';

const styles = {
  container: (backgroundColor: string, textColor: string): ViewStyle => ({
    height: 50,
    backgroundColor: backgroundColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
  headText: (textColor: string): TextStyle => ({
    color: textColor,
    fontSize: SIZES.large,
    fontWeight: 'bold',
    textAlign: 'center',
  }),
  btn: (name: string, activeTab: string, underLineColor: string): ViewStyle => ({
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: name === activeTab ? underLineColor : COLORS.btnBg,
    borderBottomWidth: name === activeTab ? 2 : 1,
  }),
  btnText: (name: string, activeTab: string, textColor: string): TextStyle => ({
    fontSize: SIZES.medium,
    color: textColor,
    fontFamily: name === activeTab ? 'RogueHero2' : 'RogueHero',
  }),
};

export default styles;
