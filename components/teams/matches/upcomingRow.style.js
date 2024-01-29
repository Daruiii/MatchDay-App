import { StyleSheet } from "react-native";
import {Dimensions} from 'react-native';
import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    // backgroundColor: COLORS.white,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  scrollContainer: {
    width: "100%",
    // left : 0,
  },

  eventContainer: (bgColor, secondColor) => ({
    // get device width
    width: Dimensions.get('window').width/1.15,
    height: 210,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: bgColor,
    borderRadius: 10,
    // borderWidth: 1/3,
    borderColor: secondColor,
    // padding: 10,
    marginRight: 10,
    marginVertical: 10,
  }),
  eventError: {
    width: "100%",
    textAlign: "center",
    justifyContent: "center",
    // backgroundColor: COLORS.secondary,
  },
  eventText: (textColor) => ({
    color: textColor,
    fontSize: SIZES.sMedium,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "RogueHero2",
  }),
  eventTextVS: (textColor) => ({
    color: textColor,
    fontSize: SIZES.xxLarge,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "RogueHero2",
  }),
  eventNow : {
    padding: 5,
    borderRadius: 5,
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: "#6441a5",
    shadowColor: COLORS.white,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  eventCompetition: (secondColor)=> ({
    width: "100%",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderBottomColor: secondColor,
    borderBottomWidth: 1/2,
    // backgroundColor: COLORS.primary,
  }),
  eventMatch : {
    width: "75%",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // shadowColor: COLORS.black,
    // shadowOffset: {
    //   width: 0,
    //   height: 5,
    // },
    // shadowOpacity: 0.25,
    // backgroundColor: COLORS.secondary,
  },
  eventDateTime : {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    padding: 10,
    // backgroundColor: COLORS.secondary,
  },

  eventGame : {
    width: "20%",
    borderRadius: 10,
    height: 30,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  eventGameImg : (secondColor)=> ({
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
  eventDate : {
    width: "30%",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: COLORS.secondary,
  },
  eventTime : {
    width: "15%",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: COLORS.secondary,
  },
  headText: (textColor) => ({
    color: textColor,
    fontSize: SIZES.large,
    fontWeight: "bold",
    textAlign: "center",
  }),
  btn: (name, activeTab, underLineColor) => ({
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: name === activeTab ? underLineColor : "transparent",
    borderBottomWidth: 1,
  }),
  btnText: (name, activeTab, textColor) => ({
    fontSize: SIZES.medium,
    fontWeight: "bold",
    color: name === activeTab ? textColor : COLORS.gray2,
  }),
});

export default styles;
