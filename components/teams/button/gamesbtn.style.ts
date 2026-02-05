import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "@constants";

const styles = StyleSheet.create({
  btnContainer: (activated: boolean) => ({
    width: "auto" as const,
    height: 30,
    backgroundColor: activated ? COLORS.success : COLORS.btnBg,
    borderRadius: SIZES.small / 1.25,
    justifyContent: "space-between" as const,
    padding: SIZES.xxSmall,
    alignItems: "center" as const,
    margin: SIZES.xxSmall,
    display: "flex" as const,
    flexDirection: "row" as const,
  }),
  text: (activated: boolean) => ({
    color: activated ? COLORS.white : COLORS.black,
    fontSize: SIZES.small,
    fontFamily: "RogueHero2",
    margin: SIZES.xxSmall,
  }),
});

export default styles;
