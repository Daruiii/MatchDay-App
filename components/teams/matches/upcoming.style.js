import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  eventGameLogoContainer: (secondColor)=> ({
    position: "absolute",
    zIndex: 10,
    left: 6,
    // right: 8,
    top: 4,
    // bottom: 5,
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
  container: {
    // backgroundColor: COLORS.white,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 125,
  },

  eventContainer: (bgColor) => ({
    width: "95%",
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
    backgroundColor: bgColor,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 15,
    marginVertical: 10,
    // shadowColor: COLORS.black,
    // shadowOffset: {
    //   width: 0,
    //   height: 5,
    // },
    // shadowOpacity: 0.25,
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
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
  }),
  eventNow : {
    padding: 5,
    borderRadius: 5,
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: "#6441a5",
  },
  eventCompetition: {
    width: "32%",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: COLORS.primary,
  },
  eventMatch : {
    width: "28%",
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
  eventDate : {
    width: "23%",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: COLORS.secondary,
  },
  eventTime : {
    width: "13%",
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
