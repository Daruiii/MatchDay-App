import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  btnContainer: {
    width: 30,
    height: 30,
    // backgroundColor: COLORS.btnBg,
    borderRadius: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
  },
  btnImg: (dimension) => ({
    width: dimension,
    height: dimension,
    tintColor: COLORS.white,
    // borderRadius: SIZES.small / 1.25,
  }),
});

export default styles;
