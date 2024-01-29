import { StyleSheet } from "react-native";
import {Dimensions} from 'react-native';
import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  btnContainer: {
    width: Dimensions.get('window').width / 6.5,
    height: 60,
    // backgroundColor: COLORS.btnBg,
    // borderRadius: SIZES.small / 1.25,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
  },
  
  btnImg: (dimension) => ({
    width: dimension,
    height: dimension,
    // tintColor: COLORS.background,
  }),
});

export default styles;
