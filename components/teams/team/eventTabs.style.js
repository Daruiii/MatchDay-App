import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: (backgroundColor, textColor) => ({
    height: 50,
    backgroundColor: backgroundColor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  }),
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
    borderBottomColor: name === activeTab ? underLineColor : "transparent" ? COLORS.btnBg : COLORS.btnBg,
    borderBottomWidth: name === activeTab ? 2 : 1,
  }),
  btnText: (name, activeTab, textColor) => ({
    fontSize: SIZES.medium,
    color: textColor,
    fontFamily: name === activeTab ? 'RogueHero2' : 'RogueHero',
  }),
});

export default styles;
