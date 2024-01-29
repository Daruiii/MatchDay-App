import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    height: 75,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: COLORS.gray2,
    // shadowColor: COLORS.black,
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 0.8,
  },
  leftButton: {
    width: "30%",
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
