import { StyleSheet } from "react-native";
import {Dimensions} from 'react-native';
import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        justifyContent: "center", 
        alignItems: "center",
        backgroundColor: COLORS.blackTR 
    },
    imgName: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
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
        fontSize: SIZES.small,
        textAlign: "center",
        fontWeight: "bold",
        marginVertical: 10,
        fontFamily: "RogueHero2",
    }),
    eventGame : {
        marginTop: 10,
    },
    modalText: (textColor) => ({
        color: textColor ? textColor : COLORS.white,
        fontSize: SIZES.small,
        fontFamily: "RogueHero2",
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
    modalBodyHeader:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        borderRadius: 10,
        padding: 10,
    },

    modalBodyTitle: (textColor) => ({
        color: textColor ? textColor : COLORS.white,
        fontSize: SIZES.medium,
        fontFamily: "RogueHero2",
        textAlign: "center",
    }),
    modalBodyContent: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        borderRadius: 10,
        padding: 10,
    },
    modalBodyContentTitle: (bgColor) => ({
        backgroundColor: bgColor ? bgColor : COLORS.gray,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginVertical: 10,
        padding: 10,
    }),
    modalBodyContentTeamText: (textColor) => ({
        color: textColor ? textColor : COLORS.white,
        fontSize: SIZES.small,
        fontFamily: "RogueHero2",
        textAlign: "center",
    }),

    modalBodyContentTeam: (bgColor) => ({
        backgroundColor: bgColor ? bgColor : COLORS.gray,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        borderRadius: 10,
        padding: 10,
    }),
    modalBodyContentTeamRanking: (bgColor) => ({
        // backgroundColor: bgColor ? bgColor : COLORS.gray,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "start",
        width: Dimensions.get('window').width / 1.4,
        gap : 10,
        borderRadius: 10,
        padding: 10,
    }),
    modalBodyContentRanking: (bgColor, myTeamSlug, teamSlug, secondColor) => ({
        backgroundColor: bgColor ? bgColor : COLORS.gray,
        borderColor: teamSlug.includes(myTeamSlug) ? secondColor : "transparent",
        borderWidth: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        borderRadius: 10,
        padding: 10,
    }),
    modalBodyContentTeamRankingLine: (bgColor) => ({
        backgroundColor: bgColor ? bgColor : COLORS.gray,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        borderRadius: 10,
        padding: 10,
    }),
    modalBodyContentScore: (bgColor) => ({
        backgroundColor: bgColor ? bgColor : COLORS.gray,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        borderRadius: 10,
        padding: 10,
    }),
    modalBodyContentScoreText: (textColor) => ({
        color: textColor ? textColor : COLORS.white,
        fontFamily: "RogueHero2",
    }),
    modalBodyContentTeamText: (textColor) => ({
        color: textColor ? textColor : COLORS.white,
        fontSize: SIZES.ssMedium,
        fontWeight: "bold",
        // fontFamily: "RogueHero2",
    }),
    lineVertical : (color) => ({
        backgroundColor: color ? color : COLORS.gray,
        width: 1,
        height: 50,
    }),
    line : (color) => ({
        backgroundColor: color ? color : COLORS.gray,
        width: "100%",
        height: 1,
    })
});

export default styles;
