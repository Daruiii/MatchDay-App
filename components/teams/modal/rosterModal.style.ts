import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "@constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    backgroundColor: COLORS.blackTR
  },
  modalContainer: (bgColor?: string, borderColor?: string) => ({
    backgroundColor: bgColor ? bgColor : COLORS.gray,
    flexDirection: "column" as const,
    width: "75%",
    padding: 20,
    borderRadius: 10,
    margin: 60,
    borderWidth: 1,
    borderColor: borderColor ? borderColor : COLORS.gray,
  }),
  modalHeader: (bgColor?: string) => ({
    backgroundColor: bgColor ? bgColor : COLORS.gray,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
    width: "100%",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  }),
  modalTitle: (textColor?: string) => ({
    color: textColor ? textColor : COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: "bold" as const,
  }),
  modalText: (textColor?: string) => ({
    color: textColor ? textColor : COLORS.white,
    fontSize: SIZES.small,
    fontWeight: "bold" as const,
  }),
  modalBody: {
    flexDirection: "column" as const,
    justifyContent: "flex-start" as const,
    alignItems: "center" as const,
    marginTop: 30,
    marginBottom: 50,
    height: "100%",
    width: "100%",
  },
  playerContainer: (bgColor?: string) => ({
    backgroundColor: bgColor ? bgColor : COLORS.gray,
    flexDirection: "column" as const,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    width: "100%",
    borderRadius: 10,
    padding: 10,
    marginBottom: 30,
  }),
  playerImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  playerInfo: {
    flexDirection: "row" as const,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    width: "100%",
  },
  line: (color?: string) => ({
    backgroundColor: color ? color : COLORS.gray,
    width: "100%",
    height: 1,
  })
});

export default styles;
