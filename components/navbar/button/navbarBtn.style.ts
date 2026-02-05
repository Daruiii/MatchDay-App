import { StyleSheet, Dimensions } from "react-native";
import { COLORS, SIZES } from "@constants";

const styles = StyleSheet.create({
  btnContainer: {
    width: Dimensions.get('window').width / 6.5,
    height: 60,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    marginHorizontal: 15,
  },
  btnImg: (dimension: number) => ({
    width: dimension,
    height: dimension,
  }),
});

export default styles;
