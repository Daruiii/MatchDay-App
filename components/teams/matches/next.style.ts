import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "@constants";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  eventContainer: (bgColor: string) => ({
    width: "100%",
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
    fontSize: SIZES.medium,
    fontWeight: "bold" as const,
    textAlign: "center" as const,
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
  eventCompetition: {
    width: "25%",
    alignItems: "center" as const,
    textAlign: "center" as const,
    justifyContent: "center" as const,
  },
  eventMatch: {
    width: "26%",
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
  },
  eventDate: {
    width: "25%",
    textAlign: "center" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  eventTime: {
    width: "14%",
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
