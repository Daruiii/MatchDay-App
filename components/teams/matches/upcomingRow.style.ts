import { StyleSheet, Dimensions } from "react-native";
import { COLORS, SIZES } from "@constants";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    marginBottom: 50,
  },
  scrollContainer: {
    width: "100%",
  },
  eventContainer: (bgColor: string, secondColor: string) => ({
    width: Dimensions.get('window').width / 1.15,
    height: 210,
    flexDirection: "column" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    backgroundColor: bgColor,
    borderRadius: 10,
    borderColor: secondColor,
    marginRight: 10,
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
  }),
  eventTextVS: (textColor: string) => ({
    color: textColor,
    fontSize: SIZES.xxLarge,
    fontWeight: "bold" as const,
    textAlign: "center" as const,
    fontFamily: "RogueHero2",
  }),
  eventNow: {
    padding: 5,
    borderRadius: 5,
    textAlign: "center" as const,
    justifyContent: "center" as const,
    backgroundColor: "#6441a5",
    shadowColor: COLORS.white,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  eventCompetition: (secondColor: string) => ({
    width: "100%",
    textAlign: "center" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    padding: 10,
    borderBottomColor: secondColor,
    borderBottomWidth: 1 / 2,
  }),
  eventMatch: {
    width: "75%",
    marginTop: 10,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
  },
  eventDateTime: {
    width: "100%",
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
    marginTop: 10,
    padding: 10,
  },
  eventGame: {
    flex: 1,
    borderRadius: 10,
    height: 30,
  },
  eventGameImg: (secondColor: string) => ({
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
  eventDate: {
    flex: 1,
  },
  eventTime: {
    flex: 1,
    alignItems: "flex-end" as const,
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
