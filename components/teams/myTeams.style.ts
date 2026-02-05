import { StyleSheet, Dimensions } from "react-native";
import { COLORS, SIZES } from "@constants";

const styles = StyleSheet.create({
  container: (backgroundColor: string) => ({ 
    marginBottom: SIZES.large,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
    backgroundColor: backgroundColor,
    borderRadius: SIZES.xSmall,
    padding: SIZES.medium,
    width: Dimensions.get('window').width - 40,
    height: 60,
  }),
  headText: (color: string) => ({
    fontSize: SIZES.ssMedium,
    color: color,
    fontWeight: "bold" as const,
    fontFamily: 'RogueHero2',
  }),
  btnContainer: {
    flexDirection: "row" as const,
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
