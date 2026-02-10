import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS, SIZES } from '@constants';

const staticStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  eventCompetition: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventMatch: {
    width: '26%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eventDate: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventTime: {
    width: '14%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const dynamicStyles = {
  eventContainer: (bgColor: string): ViewStyle => ({
    width: '100%',
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
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    textAlign: 'center',
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
