import { createTheme, colors } from "@mui/material";

const FONTS = {
  PLAYFAIR_DISPLAY: "'Playfair Display', serif",
  RED_HAT: "'Red Hat Mono', monospace",
};

export default createTheme({
  typography: {
    h1: {
      fontFamily: FONTS.PLAYFAIR_DISPLAY,
    },
    h2: {
      fontFamily: FONTS.PLAYFAIR_DISPLAY,
    },
    h3: {
      fontFamily: FONTS.PLAYFAIR_DISPLAY,
    },
    h4: {
      fontFamily: FONTS.PLAYFAIR_DISPLAY,
    },
    h5: {
      fontFamily: FONTS.PLAYFAIR_DISPLAY,
    },
    fontFamily: FONTS.RED_HAT,
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        color: "transparent",
        elevation: 0,
        position: "static",
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          justifyContent: "space-between",
          borderBottomWidth: 1,
          borderBottomStyle: "solid",
          borderBottomColor: colors.grey[500],
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
        square: true,
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: colors.grey[100],
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: false,
      },
    },
  },
});
