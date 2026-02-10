import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS, SIZES } from '@constants';

const staticStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 125,
  },
  eventError: {
    width: '100%',
    justifyContent: 'center',
  },
  eventCompetition: {
    width: '32%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventMatch: {
    width: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eventReplay: {
    width: '21%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventDate: {
    width: '19%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const dynamicStyles = {
  eventGameLogoContainer: (secondColor: string): ViewStyle => ({
    position: 'absolute',
    zIndex: 10,
    left: 6,
    top: 4,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: secondColor,
    borderRadius: 15,
  }),
  eventContainer: (bgColor: string): ViewStyle => ({
    width: '95%',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: bgColor,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 15,
    marginVertical: 10,
  }),
  eventText: (textColor: string): TextStyle => ({
    color: textColor,
    fontSize: SIZES.ssMedium,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'RogueHero2',
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
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
