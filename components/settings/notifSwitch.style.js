import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../constants";


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10
  },
  headText: {
    color: COLORS.gray, fontSize: SIZES.medium, fontFamily: 'RogueHero2',
  },
  btnImg: (dimension) => ({
    width: dimension,
    height: dimension
    // borderRadius: SIZES.small / 1.25,
  }),
});

export default styles;
