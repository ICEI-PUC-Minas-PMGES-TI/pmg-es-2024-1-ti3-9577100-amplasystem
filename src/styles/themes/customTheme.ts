import { extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: { // LARANJA
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
        // primary: { // VERDE
        //   50: "#dcfce7",
        //   100: "#bbf7d0",
        //   200: "#86efac",
        //   300: "#4ade80",
        //   400: "#22c55e",
        //   500: "#16a34a",
        //   600: "#15803d",
        //   700: "#166534",
        //   800: "#14532d",
        //   900: "#052e16",
        // },
        neutral: { // ZINC
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
        // neutral: { // Slate
        //   50: "#f8fafc",
        //   100: "#f1f5f9",
        //   200: "#e2e8f0",
        //   300: "#cbd5e1",
        //   400: "#94a3b8",
        //   500: "#64748b",
        //   600: "#475569",
        //   700: "#334155",
        //   800: "#1e293b",
        //   900: "#0f172a",
        // }
      },
    },
    dark: {
      palette: {
        primary: { // LARANJA
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
        // primary: { // VERDE
        //   50: "#f0fdf4",
        //   100: "#dcfce7",
        //   200: "#bbf7d0",
        //   300: "#86efac",
        //   400: "#4ade80",
        //   500: "#22c55e",
        //   600: "#16a34a",
        //   700: "#15803d",
        //   800: "#166534",
        //   900: "#14532d",
        // },
        neutral: { // ZINC
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
        // neutral: { // Slate
        //   50: "#f1f5f9",
        //   100: "#e2e8f0",
        //   200: "#cbd5e1",
        //   300: "#94a3b8",
        //   400: "#64748b",
        //   500: "#475569",
        //   600: "#334155",
        //   700: "#1e293b",
        //   800: "#0f172a",
        //   900: "#020617",
        // }
      },
    },
  },
  radius: {
    xs: '.125rem',
    sm: '.25rem',
    md: '.5rem',
    lg: '1rem',
    xl: '2rem',
  },
  shadow: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  fontFamily: {
    display: 'IBM Plex Serif',
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
          borderRadius: theme.vars.radius.xs,
          fontWeight: 600,
          ...(ownerState.size === 'md' && {
            minHeight: '36px',
            fontSize: '14px',
            paddingInline: '18px',
          }),
        }),
      },
    },
    JoyList: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.vars.radius.xs,
          gap: 8,
          "--List-nestedInsetStart": "32px",
          "--ListItem-radius": theme.vars.radius.xs,
        }),
      },
    },
    JoyListItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.vars.radius.xs,
          gap: 0,
          transition: 'transform 0.2s',
          position: 'relative',
          '& :hover': {
            '& .MuiSvgIcon-root': {
              transform: 'scale(1.1)',
            },
          },
          '& .MuiSvgIcon-root': {
            marginLeft: 4,
            transition: 'transform 0.2s',
          },
          '& .Mui-selected': {
            color: theme.palette.primary[500],
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '4px',
              height: '100%',
              backgroundColor: theme.palette.primary[500],
            },
            '& .MuiSvgIcon-root': {
              '& :hover': {
                transform: 'scale(2)',
              },
            },
            '& .MuiTypography-root': {
              color: theme.palette.primary[500],
              fontWeight: 900,
            },
          },
          '& > :not(.Mui-selected):hover': {
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '4px',
              height: '100%',
              backgroundColor: theme.palette.neutral[500],
            },
          }
        }),
      },
    },
    JoyInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.vars.radius.xs,
        }),
      },
    },
    JoySelect: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.vars.radius.xs,
        }),
        listbox: ({ theme }) => ({
          borderRadius: theme.vars.radius.xs,
        }),
      },
    },
    JoyCheckbox: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.vars.radius.xs,
        }),
      },
    },
    JoyRadio: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.vars.radius.xs,
        }),
      },
    },
    JoySwitch: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.vars.radius.xs,
        }),
      },
    },
    JoySlider: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.vars.radius.xs,
        }),
      },
    },
    JoyTextarea: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.vars.radius.xs,
        }),
      },
    },
    JoyAvatar: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.vars.radius.xs,
        }),
      },
    },
    JoyBadge: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.vars.radius.xs,
        }),
      },
    },
    JoyChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.vars.radius.xs,
        }),
      },
    },
    JoyDivider: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.vars.radius.xs,
        }),
      },
    },
    JoyIconButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.vars.radius.xs,
        }),
      },
    },
    JoySheet: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.vars.radius.xs,
        }),
      },
    },
    JoyTable: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.vars.radius.xs,
        }),
      },
    },
  },
});

export default theme;