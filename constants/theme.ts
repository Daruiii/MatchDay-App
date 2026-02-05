export const COLORS = {
  background: "#6a6882", // 141C2C
  headerBg: "rgba(0, 0, 0, 1)", // rgba(10,25,40,1)
  footerBg: "rgba(0, 0, 0, 0.98)", // rgba(10,15,26,1)
  addBtnBg: "rgba(10,15,26,0.85)", // 3B4556
  btnBg: "#3B4556", // 3B4556
  zero: "rgba(10,25,40,1)",

  primary: "#312651",
  secondary: "#444262",
  tertiary: "#40F9F9",
  // green like valid input
  success: "#00B761",
  // blue like info message
  info: "#151D4E",

  gray: "#83829A",
  gray2: "#C1C0C8",

  white: "#F3F4F8",
  whiteTR: "rgba(255,255,255,0.5)",
  lightWhite: "#FAFAFC",
  black: "#000000",
  blackTR: "rgba(0,0,0,0.5)",

  pandaPurple: "#bb47d6",
  pandaBlack: "#25242e",
} as const;

export const SIZES = {
  xxSmall: 3,
  xSmall: 10,
  small: 12,
  medium: 16,
  sMedium: 14,
  ssMedium: 12.75,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
} as const;

export const FONT = {
  rogue: "RogueHero-Regular",
  rogueBold: "RogueHero-Bold",
  rogueLight: "RogueHero-Light",
} as const;

export const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
} as const;
