import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "@constants";

const styles = StyleSheet.create({
  container: {
    height: 75,
    position: 'absolute' as const,
    bottom: 0,
    width: '100%',
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: COLORS.gray2,
  },
  leftButton: {
    width: "30%",
    height: '100%',
    flexDirection: 'row' as const,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    borderTopLeftRadius: 25,
    backgroundColor: COLORS.footerBg,
  },
  scrollContainer: {
    backgroundColor: COLORS.gray2,
    width: '100%',
    borderTopRightRadius: 25,
  },
});

export default styles;
