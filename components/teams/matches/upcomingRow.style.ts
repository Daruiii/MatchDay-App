import { StyleSheet, Dimensions, ViewStyle, TextStyle } from 'react-native';
import { COLORS, SIZES } from '@constants';

const staticStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  scrollContainer: {
    width: '100%',
  },
  eventError: {
    width: '100%',
    justifyContent: 'center',
  },
  eventNow: {
    padding: 5,
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: '#6441a5',
    shadowColor: COLORS.white,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  eventMatch: {
    width: '75%',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eventDateTime: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    padding: 10,
  },
  eventGame: {
    flex: 1,
    borderRadius: 10,
    height: 30,
  },
  eventDate: {
    flex: 1,
  },
  eventTime: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

const dynamicStyles = {
  eventContainer: (bgColor: string, secondColor: string): ViewStyle => ({
    width: Dimensions.get('window').width / 1.15,
    height: 210,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: bgColor,
    borderRadius: 10,
    borderColor: secondColor,
    marginRight: 10,
    marginVertical: 10,
  }),
  eventText: (textColor: string): TextStyle => ({
    color: textColor,
    fontSize: SIZES.sMedium,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'RogueHero2',
  }),
  eventTextVS: (textColor: string): TextStyle => ({
    color: textColor,
    fontSize: SIZES.xxLarge,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'RogueHero2',
  }),
  eventCompetition: (secondColor: string): ViewStyle => ({
    width: '100%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: secondColor,
    borderBottomWidth: 1 / 2,
  }),
  eventGameImg: (secondColor: string): ViewStyle => ({
    width: 26,
    borderRadius: 15,
    height: 26,
    backgroundColor: secondColor,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
    borderBottomColor: name === activeTab ? underLineColor : 'transparent',
    borderBottomWidth: 1,
  }),
  btnText: (name: string, activeTab: string, textColor: string): TextStyle => ({
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: name === activeTab ? textColor : COLORS.gray2,
  }),
};

export default { ...staticStyles, ...dynamicStyles };
