import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "@constants";

const styles = StyleSheet.create({
  btnContainer: {
    width: 30,
    height: 30,
    borderRadius: SIZES.small,
    justifyContent: "center" as const,
    alignItems: "center" as const,
  },
  btnImg: (dimension: number) => ({
    width: dimension,
    height: dimension,
    tintColor: COLORS.white,
  }),
});

export default styles;
