import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  btnContainer: (bgColor) => ({
    width: 60,
    height: 60,
    backgroundColor: bgColor,
    borderRadius: 50,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    bottom: 90,
    right: 10,
  }),
  btnImg: (dimension) => ({
    width: dimension,
    height: dimension
    // borderRadius: SIZES.small / 1.25,
  }),
});

export default styles;
