const theme = {
  name: "scrapplr",
  rounding: 12,
  spacing: 24,
  defaultMode: "light",
  global: {
    colors: {
      brand: {
        dark: "#92abb3",
        light: "#92abb3",
      },
      background: {
        dark: "#111111",
        light: "#eafaff",
        glass:
          "linear-gradient(to top left, rgba(0, 255, 255, 0.6), rgba(255, 255, 255, 0.9))",
      },
      "background-back": {
        dark: "#111111",
        light: "#eafaff",
      },
      "background-front": {
        dark: "#222222",
        light: "white",
      },
      "background-contrast": {
        dark: "#FFFFFF11",
        light: "#fff5eb",
      },
      text: {
        dark: "#EEEEEE",
        light: "#333333",
      },
      "text-strong": {
        dark: "#FFFFFF",
        light: "#000000",
      },
      "text-weak": {
        dark: "#CCCCCC",
        light: "#4F7480",
      },
      "text-xweak": {
        dark: "#999999",
        light: "#666666",
      },
      border: {
        dark: "#444444",
        light: "#CCCCCC",
      },
      "active-background": "background-contrast",
      "active-text": "text-strong",
      "selected-background": "brand",
      "selected-text": "text-strong",
      "status-critical": "#FF4040",
      "status-warning": "#FFAA15",
      "status-ok": "#00C781",
      "status-unknown": "#CCCCCC",
      "status-disabled": "#CCCCCC",
      "graph-0": "brand",
      "graph-1": "#4F7480",
      focus: "#9EE8FF",
      control: "#b39981",
      glass:
        "linear-gradient(to top left, rgba(255, 245, 235, 0.7), rgba(255, 255, 255, 0.3))",
    },
    font: {
      family: '"Montserrat"',
      face:
        "/* cyrillic-ext */\n@font-face {\n  font-family: 'Montserrat';\n  font-style: normal;\n  font-weight: 400;\n  src: url(https://fonts.gstatic.com/s/montserrat/v15/JTUSjIg1_i6t8kCHKm459WRhyyTh89ZNpQ.woff2) format('woff2');\n  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;\n}\n/* cyrillic */\n@font-face {\n  font-family: 'Montserrat';\n  font-style: normal;\n  font-weight: 400;\n  src: url(https://fonts.gstatic.com/s/montserrat/v15/JTUSjIg1_i6t8kCHKm459W1hyyTh89ZNpQ.woff2) format('woff2');\n  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n/* vietnamese */\n@font-face {\n  font-family: 'Montserrat';\n  font-style: normal;\n  font-weight: 400;\n  src: url(https://fonts.gstatic.com/s/montserrat/v15/JTUSjIg1_i6t8kCHKm459WZhyyTh89ZNpQ.woff2) format('woff2');\n  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;\n}\n/* latin-ext */\n@font-face {\n  font-family: 'Montserrat';\n  font-style: normal;\n  font-weight: 400;\n  src: url(https://fonts.gstatic.com/s/montserrat/v15/JTUSjIg1_i6t8kCHKm459WdhyyTh89ZNpQ.woff2) format('woff2');\n  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n/* latin */\n@font-face {\n  font-family: 'Montserrat';\n  font-style: normal;\n  font-weight: 400;\n  src: url(https://fonts.gstatic.com/s/montserrat/v15/JTUSjIg1_i6t8kCHKm459WlhyyTh89Y.woff2) format('woff2');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n}\n",
      size: "18px",
      height: "24px",
      maxWidth: "432px",
    },
    active: {
      background: "active-background",
      color: "active-text",
    },
    hover: {
      background: "active-background",
      color: "active-text",
    },
    selected: {
      background: "selected-background",
      color: "selected-text",
    },
    control: {
      border: {
        radius: "12px",
      },
    },
    drop: {
      border: {
        radius: "12px",
      },
    },
    borderSize: {
      xsmall: "1px",
      small: "2px",
      medium: "4px",
      large: "12px",
      xlarge: "24px",
    },
    breakpoints: {
      small: {
        value: 768,
        borderSize: {
          xsmall: "1px",
          small: "2px",
          medium: "4px",
          large: "6px",
          xlarge: "12px",
        },
        edgeSize: {
          none: "0px",
          hair: "1px",
          xxsmall: "2px",
          xsmall: "3px",
          small: "6px",
          medium: "12px",
          large: "24px",
          xlarge: "48px",
        },
        size: {
          xxsmall: "24px",
          xsmall: "48px",
          small: "96px",
          medium: "192px",
          large: "380px",
          xlarge: "768px",
          full: "100%",
        },
      },
      medium: {
        value: 1200,
      },
      large: {},
    },
    edgeSize: {
      none: "0px",
      hair: "1px",
      xxsmall: "3px",
      xsmall: "6px",
      small: "12px",
      medium: "24px",
      large: "48px",
      xlarge: "96px",
      responsiveBreakpoint: "small",
    },
    input: {
      padding: "12px",
      weight: 600,
    },
    spacing: "24px",
    size: {
      xxsmall: "48px",
      xsmall: "96px",
      small: "192px",
      medium: "384px",
      large: "768px",
      xlarge: "1152px",
      xxlarge: "1536px",
      full: "100%",
    },
  },
  chart: {},
  diagram: {
    line: {},
  },
  meter: {},
  button: {
    border: {
      width: "2px",
      radius: "18px",
    },
    padding: {
      vertical: "4px",
      horizontal: "22px",
    },
  },
  anchor: {
    hover: {
      textDecoration: "none",
    },
  },
  checkBox: {
    check: {
      radius: "12px",
    },
    toggle: {
      radius: "24px",
      size: "48px",
    },
    size: "24px",
  },
  radioButton: {
    size: "24px",
  },
  formField: {
    border: {
      color: "border",
      error: {
        color: {
          dark: "white",
          light: "status-critical",
        },
      },
      position: "inner",
      side: "bottom",
      style: "solid",
    },
    content: {
      pad: "small",
    },
    disabled: {
      background: {
        color: "status-disabled",
        opacity: "medium",
      },
    },
    error: {
      color: "status-critical",
      margin: {
        vertical: "xsmall",
        horizontal: "small",
      },
    },
    help: {
      margin: {
        start: "small",
      },
      size: "xsmall",
    },
    info: {
      color: "text-xweak",
      margin: {
        vertical: "xsmall",
        horizontal: "small",
      },
    },
    label: {
      margin: {
        vertical: "xsmall",
        horizontal: "small",
      },
      size: "small",
    },
    margin: {
      bottom: "small",
    },
    round: "12px",
  },
  calendar: {
    small: {
      fontSize: "15.2px",
      lineHeight: 1.375,
      daySize: "27.43px",
    },
    medium: {
      fontSize: "18px",
      lineHeight: 1.45,
      daySize: "54.86px",
    },
    large: {
      fontSize: "26.4px",
      lineHeight: 1.11,
      daySize: "109.71px",
    },
  },
  clock: {
    analog: {
      hour: {
        width: "8px",
        size: "24px",
      },
      minute: {
        width: "4px",
        size: "12px",
      },
      second: {
        width: "3px",
        size: "9px",
      },
      size: {
        small: "72px",
        medium: "96px",
        large: "144px",
        xlarge: "216px",
        huge: "288px",
      },
    },
    digital: {
      text: {
        xsmall: {
          size: "12.4px",
          height: 1.5,
        },
        small: {
          size: "15.2px",
          height: 1.43,
        },
        medium: {
          size: "18px",
          height: 1.375,
        },
        large: {
          size: "20.8px",
          height: 1.167,
        },
        xlarge: {
          size: "23.6px",
          height: 1.1875,
        },
        xxlarge: {
          size: "29.2px",
          height: 1.125,
        },
      },
    },
  },
  heading: {
    level: {
      1: {
        small: {
          size: "29px",
          height: "35px",
          maxWidth: "701px",
        },
        medium: {
          size: "40px",
          height: "46px",
          maxWidth: "970px",
        },
        large: {
          size: "63px",
          height: "69px",
          maxWidth: "1507px",
        },
        xlarge: {
          size: "85px",
          height: "91px",
          maxWidth: "2045px",
        },
      },
      2: {
        small: {
          size: "26px",
          height: "32px",
          maxWidth: "634px",
        },
        medium: {
          size: "35px",
          height: "41px",
          maxWidth: "835px",
        },
        large: {
          size: "43px",
          height: "49px",
          maxWidth: "1037px",
        },
        xlarge: {
          size: "52px",
          height: "58px",
          maxWidth: "1238px",
        },
      },
      3: {
        small: {
          size: "24px",
          height: "30px",
          maxWidth: "566px",
        },
        medium: {
          size: "29px",
          height: "35px",
          maxWidth: "701px",
        },
        large: {
          size: "35px",
          height: "41px",
          maxWidth: "835px",
        },
        xlarge: {
          size: "40px",
          height: "46px",
          maxWidth: "970px",
        },
      },
      4: {
        small: {
          size: "21px",
          height: "27px",
          maxWidth: "499px",
        },
        medium: {
          size: "24px",
          height: "30px",
          maxWidth: "566px",
        },
        large: {
          size: "26px",
          height: "32px",
          maxWidth: "634px",
        },
        xlarge: {
          size: "29px",
          height: "35px",
          maxWidth: "701px",
        },
      },
      5: {
        small: {
          size: "17px",
          height: "23px",
          maxWidth: "398px",
        },
        medium: {
          size: "17px",
          height: "23px",
          maxWidth: "398px",
        },
        large: {
          size: "17px",
          height: "23px",
          maxWidth: "398px",
        },
        xlarge: {
          size: "17px",
          height: "23px",
          maxWidth: "398px",
        },
      },
      6: {
        small: {
          size: "15px",
          height: "21px",
          maxWidth: "365px",
        },
        medium: {
          size: "15px",
          height: "21px",
          maxWidth: "365px",
        },
        large: {
          size: "15px",
          height: "21px",
          maxWidth: "365px",
        },
        xlarge: {
          size: "15px",
          height: "21px",
          maxWidth: "365px",
        },
      },
    },
  },
  paragraph: {
    small: {
      size: "17px",
      height: "23px",
      maxWidth: "398px",
    },
    medium: {
      size: "18px",
      height: "24px",
      maxWidth: "432px",
    },
    large: {
      size: "21px",
      height: "27px",
      maxWidth: "499px",
    },
    xlarge: {
      size: "24px",
      height: "30px",
      maxWidth: "566px",
    },
    xxlarge: {
      size: "29px",
      height: "35px",
      maxWidth: "701px",
    },
  },
  text: {
    xsmall: {
      size: "15px",
      height: "21px",
      maxWidth: "365px",
    },
    small: {
      size: "17px",
      height: "23px",
      maxWidth: "398px",
    },
    medium: {
      size: "18px",
      height: "24px",
      maxWidth: "432px",
    },
    large: {
      size: "21px",
      height: "27px",
      maxWidth: "499px",
    },
    xlarge: {
      size: "24px",
      height: "30px",
      maxWidth: "566px",
    },
    xxlarge: {
      size: "29px",
      height: "35px",
      maxWidth: "701px",
    },
  },
  scale: 0.7,
  layer: {
    background: {
      dark: "#111111",
      light: "#eafaff",
    },
  },
};

export default theme;
