import { extendTheme } from '@mui/joy/styles';

const customThemec = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: "#ffedd5",
          100: "#fed7aa",
          200: "#fdba74",
          300: "#fb923c",
          400: "#f97316",
          500: "#ea580c",
          600: "#c2410c",
          700: "#9a3412",
          800: "#7c2d12",
          900: "#431407",
        },
        neutral: {
          50: "#fafafa",
          100: "#f4f4f5",
          200: "#e4e4e7",
          300: "#d4d4d8",
          400: "#a1a1aa",
          500: "#71717a",
          600: "#52525b",
          700: "#3f3f46",
          800: "#27272a",
          900: "#18181b",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },
        neutral: {
          50: "#f4f4f5",
          100: "#e4e4e7",
          200: "#d4d4d8",
          300: "#a1a1aa",
          400: "#71717a",
          500: "#52525b",
          600: "#3f3f46",
          700: "#27272a",
          800: "#18181b",
          900: "#09090b",
        },
      },
    },
  },
  fontFamily: {
    display: 'IBM Plex Sans',
    body: 'IBM Plex Sans',
    code: 'IBM Plex Mono',
  },
  focus: {
    default: {
      outlineWidth: '2px',
      outlineOffset: '2px',
      outlineColor: '#339af0',
    },
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          transition: 'initial',
          borderRadius: '2px',
          fontWeight: 600,
          ...(ownerState.size === 'md' && {
            minHeight: '36px',
            fontSize: '14px',
            paddingInline: '18px',
          }),
          '&:active': {
            boxShadow: 'none',
            transform: 'translateY(1px)',
          },
        }),
      },
    },
    JoyInput: {
      styleOverrides: {
        root: {
          borderRadius: '2px',
        },
      },
    },
    JoySelect: {
      styleOverrides: {
        root: {
          borderRadius: '2px',
        },
        listbox: {
          borderRadius: '2px',
        },
      },
    },
    JoyCheckbox: {
      styleOverrides: {
        root: {
          borderRadius: '2px',
        },
      },
      defaultProps: {
        sx: {
          borderRadius: '2px',
        },
      },
    },
    JoyRadio: {
      styleOverrides: {
        root: {
          borderRadius: '2px',
        },
      },
    },
    JoySwitch: {
      styleOverrides: {
        root: {
          borderRadius: '2px',
        },
      },
    },
    JoySlider: {
      styleOverrides: {
        root: {
          borderRadius: '2px',
        },
      },
    },
    JoyTextarea: {
      styleOverrides: {
        root: {
          borderRadius: '2px',
        },
      },
    },
    JoyAvatar: {
      styleOverrides: {
        root: {
          borderRadius: '2px',
        },
      },
    },
    JoyBadge: {
      styleOverrides: {
        root: {
          borderRadius: '2px',
        },
      },
    },
    JoyChip: {
      styleOverrides: {
        root: {
          borderRadius: '2px',
        },
      },
    },
    JoyDivider: {
      styleOverrides: {
        root: {
          borderRadius: '2px',
        },
      },
    },
    JoyIconButton: {
      styleOverrides: {
        root: {
          borderRadius: '2px',
        },
      },
    },
    JoySheet: {
      styleOverrides: {
        root: {
          borderRadius: '2px',
        },
      },
    },
    JoyTable: {
      styleOverrides: {
        root: {
          borderRadius: '2px',
        },
      },
    },
    JoyList: {
      styleOverrides: {
        root: {
          borderRadius: '2px',
        },
      },
      defaultProps: {
        sx: {
          gap: 1,
          "--List-nestedInsetStart": "30px",
          "--ListItem-radius": "2px",
          // "--ListItem-radius": (theme) => theme.vars.radius.xs,
        },
      },
    },
  },
});

export default customThemec;