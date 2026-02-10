import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '@constants';

const styles = StyleSheet.create({
  container: {
    margin: SIZES.large,
    backgroundColor: COLORS.headerBg,
    padding: SIZES.medium,
    width: '90%',
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 5,
    marginHorizontal: SIZES.medium,
    shadowColor: COLORS.gray,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  headText: {
    fontSize: SIZES.small,
    color: COLORS.white,
    paddingLeft: SIZES.small,
    paddingTop: SIZES.small,
    fontFamily: 'RogueHero2',
  },
  input: {
    height: 40,
    margin: 12,
    backgroundColor: COLORS.gray,
    borderRadius: 5,
    color: COLORS.white,
    padding: 10,
  },
  btnContainer: {
    backgroundColor: COLORS.btnBg,
    width: 'auto' as const,
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    justifyContent: 'flex-start' as const,
    alignItems: 'center' as const,
  },
  buttonContainer: {
    flexDirection: 'row' as const,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  submitBtn: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 30,
    alignItems: 'center' as const,
  },
  submitText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontFamily: 'RogueHero2',
  },
});

export default styles;
