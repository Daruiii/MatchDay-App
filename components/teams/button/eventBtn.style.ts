import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "@constants";

const styles = StyleSheet.create({
  btnContainer: {
    width: 30,
    height: 30,
    backgroundColor: COLORS.whiteTR,
    borderRadius: SIZES.small,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    marginHorizontal: 1,
  },
  btnImg: (dimension: number) => ({
    width: dimension,
    height: dimension,
  }),
});

export default styles;
