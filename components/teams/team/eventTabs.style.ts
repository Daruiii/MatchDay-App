import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "@constants";

const styles = StyleSheet.create({
  container: (backgroundColor: string, textColor: string) => ({
    height: 50,
    backgroundColor: backgroundColor,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
  }),
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
    borderBottomColor: name === activeTab ? underLineColor : COLORS.btnBg,
    borderBottomWidth: name === activeTab ? 2 : 1,
  }),
  btnText: (name: string, activeTab: string, textColor: string) => ({
    fontSize: SIZES.medium,
    color: textColor,
    fontFamily: name === activeTab ? 'RogueHero2' : 'RogueHero',
  }),
});

export default styles;
