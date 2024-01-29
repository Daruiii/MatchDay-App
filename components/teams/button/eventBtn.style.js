import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  btnContainer: {
    width: 30,
    height: 30,
    backgroundColor: COLORS.whiteTR,
    borderRadius: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 1,
  },
  btnImg: (dimension) => ({
    width: dimension,
    height: dimension,
  }),
});

export default styles;
