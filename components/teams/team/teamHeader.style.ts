import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "@constants";

const styles = StyleSheet.create({
  container: (secondColor: string) => ({
    alignItems: "center" as const,
    justifyContent: "center" as const,
    marginVertical: 20,
    borderBottomColor: secondColor,
    borderBottomWidth: 1 / 2,
    paddingBottom: 20,
  }),
  headerContainer: {
    width: "100%",
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    gap: 30,
    marginBottom: 20,
  },
  headText: (textColor: string) => ({
    color: textColor,
    fontSize: SIZES.small,
    fontWeight: "bold" as const,
    textAlign: "center" as const,
    fontFamily: 'RogueHero2',
  }),
});

export default styles;
