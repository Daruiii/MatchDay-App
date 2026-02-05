import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "@constants";

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    gap: 10
  },
  headText: {
    color: COLORS.gray,
    fontSize: SIZES.medium,
    fontFamily: 'RogueHero2',
  },
  btnImg: (dimension: number) => ({
    width: dimension,
    height: dimension
  }),
});

export default styles;
