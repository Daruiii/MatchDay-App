import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
    container: (secondColor) => ({
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    borderBottomColor: secondColor,
    borderBottomWidth: 1 / 2,
    paddingBottom: 20,
    }),
    headerContainer: {
    width: "100%",
    flexDirection:"row",
    alignItems: "center", 
    justifyContent: "center",
    gap: 30,
    marginBottom: 20,
    },
    headText: (textColor) => ({
        color: textColor, 
        fontSize: SIZES.small, 
        fontWeight: "bold", 
        textAlign: "center",
        fontFamily: 'RogueHero2',
    }),
});

export default styles;
