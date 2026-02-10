import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS, SIZES } from '@constants';

const staticStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.blackTR,
  },
  modalBody: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 50,
    height: '100%',
    width: '100%',
  },
  playerImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  playerInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

const dynamicStyles = {
  modalContainer: (bgColor?: string, borderColor?: string): ViewStyle => ({
    backgroundColor: bgColor || COLORS.gray,
    flexDirection: 'column',
    width: '75%',
    padding: 20,
    borderRadius: 10,
    margin: 60,
    borderWidth: 1,
    borderColor: borderColor || COLORS.gray,
  }),
  modalHeader: (bgColor?: string): ViewStyle => ({
    backgroundColor: bgColor || COLORS.gray,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  }),
  modalTitle: (textColor?: string): TextStyle => ({
    color: textColor || COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: 'bold',
  }),
  modalText: (textColor?: string): TextStyle => ({
    color: textColor || COLORS.white,
    fontSize: SIZES.small,
    fontWeight: 'bold',
  }),
  playerContainer: (bgColor?: string): ViewStyle => ({
    backgroundColor: bgColor || COLORS.gray,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 10,
    padding: 10,
    marginBottom: 30,
  }),
  line: (color?: string): ViewStyle => ({
    backgroundColor: color || COLORS.gray,
    width: '100%',
    height: 1,
  }),
};

export default { ...staticStyles, ...dynamicStyles };
