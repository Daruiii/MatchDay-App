import { StyleSheet, Dimensions, ViewStyle, TextStyle } from 'react-native';
import { COLORS, SIZES } from '@constants';

const staticStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.blackTR,
  },
  imgName: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    gap: 5,
  },
  eventGame: {
    marginTop: 10,
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
  modalBodyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderRadius: 10,
    padding: 10,
  },
  modalBodyContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 10,
    padding: 10,
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
    fontSize: SIZES.small,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 10,
    fontFamily: 'RogueHero2',
  }),
  modalText: (textColor?: string): TextStyle => ({
    color: textColor || COLORS.white,
    fontSize: SIZES.small,
    fontFamily: 'RogueHero2',
  }),
  modalBodyTitle: (textColor?: string): TextStyle => ({
    color: textColor || COLORS.white,
    fontSize: SIZES.medium,
    fontFamily: 'RogueHero2',
    textAlign: 'center',
  }),
  modalBodyContentTitle: (bgColor?: string): ViewStyle => ({
    backgroundColor: bgColor || COLORS.gray,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
  }),
  modalBodyContentTeamText: (textColor?: string): TextStyle => ({
    color: textColor || COLORS.white,
    fontSize: SIZES.small,
    fontFamily: 'RogueHero2',
    textAlign: 'center',
  }),
  modalBodyContentTeamName: (textColor?: string): TextStyle => ({
    color: textColor || COLORS.white,
    fontSize: SIZES.small,
    fontFamily: 'RogueHero2',
    flex: 1,
  }),
  modalBodyContentTeam: (bgColor?: string): ViewStyle => ({
    backgroundColor: bgColor || COLORS.gray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderRadius: 10,
    padding: 10,
  }),
  modalBodyContentTeamRanking: (bgColor?: string): ViewStyle => ({
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: Dimensions.get('window').width / 1.4,
    gap: 10,
    borderRadius: 10,
    padding: 10,
  }),
  modalBodyContentRanking: (
    bgColor?: string,
    myTeamSlug?: string,
    teamSlug?: string,
    secondColor?: string
  ): ViewStyle => ({
    backgroundColor: bgColor || COLORS.gray,
    borderColor:
      teamSlug && myTeamSlug && teamSlug.includes(myTeamSlug) ? secondColor : 'transparent',
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderRadius: 10,
    padding: 10,
    gap: 8,
  }),
  modalBodyContentTeamRankingLine: (bgColor?: string): ViewStyle => ({
    backgroundColor: bgColor || COLORS.gray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderRadius: 10,
    padding: 10,
  }),
  modalBodyContentScore: (bgColor?: string): ViewStyle => ({
    backgroundColor: bgColor || COLORS.gray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderRadius: 10,
    padding: 10,
  }),
  modalBodyContentScoreText: (textColor?: string): TextStyle => ({
    color: textColor || COLORS.white,
    fontFamily: 'RogueHero2',
  }),
  lineVertical: (color?: string): ViewStyle => ({
    backgroundColor: color || COLORS.gray,
    width: 1,
    height: 50,
  }),
  line: (color?: string): ViewStyle => ({
    backgroundColor: color || COLORS.gray,
    width: '100%',
    height: 1,
  }),
};

export default { ...staticStyles, ...dynamicStyles };
