import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  btnContainer:(activated) => ({
    width: "auto",
    height: 30,
    backgroundColor: activated ? COLORS.success : COLORS.btnBg,
    borderRadius: SIZES.small / 1.25,
    justifyContent: "space-between",
    padding: SIZES.xxSmall,
    alignItems: "center",
    margin : SIZES.xxSmall,
    display: "flex",
    flexDirection: "row",
  }),
  text: (activated) => ({
    color: activated ? COLORS.white : COLORS.black,
    fontSize: SIZES.small,
    fontFamily:"RogueHero2",
    margin: SIZES.xxSmall,
  }),
});

export default styles;
