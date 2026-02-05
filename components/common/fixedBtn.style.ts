import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "@constants";

const styles = StyleSheet.create({
  btnContainer: (bgColor: string) => ({
    width: 60,
    height: 60,
    backgroundColor: bgColor,
    borderRadius: 50,
    position: "absolute" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    bottom: 90,
    right: 10,
  }),
  btnImg: (dimension: number) => ({
    width: dimension,
    height: dimension
  }),
});

export default styles;
