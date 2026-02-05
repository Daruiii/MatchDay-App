import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "@constants";

const styles = StyleSheet.create({
  eventGameLogoContainer: (secondColor: string) => ({
    position: "absolute" as const,
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
  container: {
    flexDirection: "column" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    marginBottom: 125,
  },
  eventContainer: (bgColor: string) => ({
    width: "95%",
    height: 70,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "start" as const,
    backgroundColor: bgColor,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 15,
    marginVertical: 10,
  }),
  eventError: {
    width: "100%",
    textAlign: "center" as const,
    justifyContent: "center" as const,
  },
  eventText: (textColor: string) => ({
    color: textColor,
    fontSize: SIZES.sMedium,
    fontWeight: "bold" as const,
    textAlign: "center" as const,
    fontFamily: "RogueHero2",
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
  }),
  eventNow: {
    padding: 5,
    borderRadius: 5,
    textAlign: "center" as const,
    justifyContent: "center" as const,
    backgroundColor: "#6441a5",
  },
  eventNowText: {
    color: "white",
    fontSize: SIZES.small,
    fontWeight: "bold" as const,
    textAlign: "center" as const,
    fontFamily: "RogueHero2",
  },
  eventCompetition: {
    width: "32%",
    textAlign: "center" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  eventMatch: {
    width: "28%",
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
  },
  eventDate: {
    width: "23%",
    textAlign: "center" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  eventTime: {
    width: "13%",
    textAlign: "center" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  headText: (textColor: string) => ({
    color: textColor,
    fontSize: SIZES.large,
    fontWeight: "bold" as const,
    textAlign: "center" as const,
  }),
  btn: (name: string, activeTab: string, underLineColor: string) => ({
    width: "50%",
    height: "100%",
    justifyContent: "center" as const,
    alignItems: "center" as const,
    borderBottomColor: name === activeTab ? underLineColor : "transparent",
    borderBottomWidth: 1,
  }),
  btnText: (name: string, activeTab: string, textColor: string) => ({
    fontSize: SIZES.medium,
    fontWeight: "bold" as const,
    color: name === activeTab ? textColor : COLORS.gray2,
  }),
});

export default styles;
