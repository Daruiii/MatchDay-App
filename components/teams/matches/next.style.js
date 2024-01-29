import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    // backgroundColor: COLORS.white,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  eventContainer: (bgColor) => ({
    width: "100%",
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
    fontSize: SIZES.medium,
    fontWeight: "bold",
    textAlign: "center",
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
    width: "25%",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    // backgroundColor: COLORS.primary,
  },
  eventMatch : {
    width: "26%",
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
    width: "25%",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: COLORS.secondary,
  },
  eventTime : {
    width: "14%",
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
