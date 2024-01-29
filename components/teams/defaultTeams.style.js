import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: (backgroundColor) => ({ 
    marginBottom: SIZES.large,
    // backgroundColor: "#D9D9D9D9",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: backgroundColor,
    borderRadius: SIZES.xSmall,
    padding: SIZES.medium,
    width: 350,
    height: 60,
  }),
  headText : (color) => ({
    fontSize: SIZES.large,
    color: color,
  }),
  btnContainer: {
    flexDirection: "row",
  },
  contextText: {
    fontSize: SIZES.medium - 2,
    color: COLORS.gray,
    marginVertical: SIZES.small / 1.25,
  },
  scrollContainer: {
    backgroundColor: COLORS.gray2,
    height: '100%',
    marginLeft: 10,
  },
});

export default styles;
