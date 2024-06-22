import { extendTheme } from '@mui/joy/styles';

const borderRadius = {
  small: '0.25rem',
  medium: '0.5rem',
  large: '1rem',
};

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
          borderRadius: borderRadius.medium,
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
          borderRadius: borderRadius.medium,
        },
      },
    },
    JoySelect: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.medium,
        },
        listbox: {
          borderRadius: borderRadius.medium,
        },
      },
    },
    JoyCheckbox: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.medium,
        },
      },
      defaultProps: {
        sx: {
          borderRadius: borderRadius.medium,
        },
      },
    },
    JoyRadio: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.medium,
        },
      },
    },
    JoySwitch: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.medium,
        },
      },
    },
    JoySlider: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.small,
        },
      },
    },
    JoyTextarea: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.medium,
        },
      },
    },
    JoyAvatar: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.medium,
        },
      },
    },
    JoyBadge: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.medium,
        },
      },
    },
    JoyChip: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.medium,
        },
      },
    },
    JoyDivider: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.medium,
        },
      },
    },
    JoyIconButton: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.medium,
        },
      },
    },
    JoySheet: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.medium,
        },
      },
    },
    JoyTable: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.medium,
        },
      },
    },
    JoyList: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.medium,
        },
      },
      defaultProps: {
        sx: {
          gap: 1,
          "--List-nestedInsetStart": "30px",
          "--ListItem-radius": borderRadius.medium,
          // "--ListItem-radius": (theme) => theme.vars.radius.xs,
        },
      },
    },
  },
});

export default customThemec;