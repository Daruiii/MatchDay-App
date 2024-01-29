import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        justifyContent: "center", 
        alignItems: "center",
        backgroundColor: COLORS.blackTR 
    },
    modalContainer: (bgColor, borderColor) => ({
        backgroundColor: bgColor ? bgColor : COLORS.gray,
        flexDirection: "column",
        width: "75%",
        padding: 20,
        borderRadius: 10,
        margin: 60,
        borderWidth: 1,
        borderColor: borderColor ? borderColor : COLORS.gray,
    }),
    modalHeader:(bgColor) => ({
        backgroundColor: bgColor ? bgColor : COLORS.gray,
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    }),
    modalTitle: (textColor) => ({
        color: textColor ? textColor : COLORS.white,
        fontSize: SIZES.medium,
        fontWeight: "bold",
    }),
    modalText: (textColor) => ({
        color: textColor ? textColor : COLORS.white,
        fontSize: SIZES.small,
        fontWeight: "bold",
    }),
    modalBody : {
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        marginTop: 30,
        marginBottom: 50,
        height: "100%",
        width: "100%",
    },
    playerContainer:(bgColor) => ({
        backgroundColor: bgColor ? bgColor : COLORS.gray,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        borderRadius: 10,
        padding: 10,
        marginBottom: 30,
    }),
    playerImg : {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    playerInfo : {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },

    line : (color) => ({
        backgroundColor: color ? color : COLORS.gray,
        width: "100%",
        height: 1,
    })
});

export default styles;
