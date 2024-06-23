import { extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          body:  '#fff',
          surface: '#f8fafc',
        },
        divider: '#cbd5e1',
        primary: { // Orange
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
        success: { // Green
          50: "#dcfce7",
          100: "#bbf7d0",
          200: "#86efac",
          300: "#4ade80",
          400: "#22c55e",
          500: "#16a34a",
          600: "#15803d",
          700: "#166534",
          800: "#14532d",
          900: "#052e16",
        },
        warning: { // Blue
          50: "#dbeafe",
          100: "#bfdbfe",
          200: "#93c5fd",
          300: "#60a5fa",
          400: "#3b82f6",
          500: "#2563eb",
          600: "#1d4ed8",
          700: "#1e40af",
          800: "#1e3a8a",
          900: "#172554",
        },    
        danger: { // Rose
          50: "#ffe4e6",
          100: "#fecdd3",
          200: "#fda4af",
          300: "#fb7185",
          400: "#f43f5e",
          500: "#e11d48",
          600: "#be123c",
          700: "#9f1239",
          800: "#881337",
          900: "#4c0519",
        },
        neutral: { // Slate
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        // danger: { // Red
        //   50: "#fee2e2",
        //   100: "#fecaca",
        //   200: "#fca5a5",
        //   300: "#f87171",
        //   400: "#ef4444",
        //   500: "#dc2626",
        //   600: "#b91c1c",
        //   700: "#991b1b",
        //   800: "#7f1d1d",
        //   900: "#450a0a",
        // },
        // neutral: { // Zinc
        //   50: "#fafafa",
        //   100: "#f4f4f5",
        //   200: "#e4e4e7",
        //   300: "#d4d4d8",
        //   400: "#a1a1aa",
        //   500: "#71717a",
        //   600: "#52525b",
        //   700: "#3f3f46",
        //   800: "#27272a",
        //   900: "#18181b",
        // },
      },
    },
    dark: {
      palette: {
        background: {
          body:  '#020617', // Slate
          surface: '#0f172a', // Slate
        },
        divider: '#334155',
        primary: { // Orange
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
        },success: { // Green
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
        warning: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },   
        danger: { // Rose
          50: "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          300: "#fda4af",
          400: "#fb7185",
          500: "#f43f5e",
          600: "#e11d48",
          700: "#be123c",
          800: "#9f1239",
          900: "#881337",
        },     
        neutral: { // Slate
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        // danger: { // Red
        //   50: "#fef2f2",
        //   100: "#fee2e2",
        //   200: "#fecaca",
        //   300: "#fca5a5",
        //   400: "#f87171",
        //   500: "#ef4444",
        //   600: "#dc2626",
        //   700: "#b91c1c",
        //   800: "#991b1b",
        //   900: "#7f1d1d",
        // },
        // neutral: { // Zinc
        //   50: "#fafafa",
        //   100: "#f4f4f5",
        //   200: "#e4e4e7",
        //   300: "#d4d4d8",
        //   400: "#a1a1aa",
        //   500: "#71717a",
        //   600: "#52525b",
        //   700: "#3f3f46",
        //   800: "#27272a",
        //   900: "#18181b",
        // },
        // neutral: { // Green
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
    display: 'IBM Plex Sans',
    body: 'IBM Plex Sans',
    code: 'IBM Plex Mono',
  },
  focus: {
    default: {
      outlineWidth: '2px',
      outlineOffset: '1px',
      outlineColor: '#fb923c',
    },
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          transition: 'initial',
          borderRadius: theme.vars.radius.md,
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
          borderRadius: theme.vars.radius.md,
          gap: '.5rem',
          "--List-nestedInsetStart": "32px",
          "--ListItem-radius": theme.vars.radius.md,
        }),
      },
    },
    JoyListItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.vars.radius.md,
          gap: 4,
          transition: 'transform 0.2s',
          position: 'relative',
          textDecoration: 'none',
          '& .MuiSvgIcon-root': {
            marginLeft: 4,
            transition: 'transform 0.2s',
            color: theme.palette.mode === 'dark' ? theme.palette.neutral[300] : theme.palette.neutral[800],
          },
          '& .MuiTypography-root': {
            color: theme.palette.mode === 'dark' ? theme.palette.neutral[300] : theme.palette.neutral[800],
          },
          '& .Mui-selected': {
            color: theme.palette.primary[500],
            backgroundColor: theme.palette.background.surface,
            '&:hover': {
              backgroundColor: theme.palette.mode === 'dark' ? theme.palette.neutral[800] : theme.palette.neutral[100],
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '4px',
              height: '100%',
              borderRadius: theme.radius.xl,
              backgroundColor: theme.palette.primary[500],
            },
            '& .MuiSvgIcon-root': {
              color: theme.palette.primary[500],
            },
            '& .MuiTypography-root': {
              color: theme.palette.primary[500],
              fontWeight: 900,
            },
          },
        }),
      },
    },
    JoyInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.vars.radius.md,
        }),
      },
    },
    JoySelect: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.vars.radius.md,
        }),
        listbox: ({ theme }) => ({
          borderRadius: theme.vars.radius.md,
          backgroundColor: theme.palette.background.body,
        }),
      },
    },
    JoyMenu: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.vars.radius.md,
          backgroundColor: theme.palette.background.body,
        }),
      },
    },
    JoyCheckbox: {
      styleOverrides: {
        checkbox: ({ theme }) => ({
          borderRadius: theme.vars.radius.sm,
        }),
      },
    },
    JoyRadio: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.vars.radius.md,
        }),
      },
    },
    JoySwitch: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.vars.radius.md,
        }),
      },
    },
    JoySlider: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.vars.radius.md,
        }),
      },
    },
    JoyTextarea: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.vars.radius.md,
        }),
      },
    },
    JoyAvatar: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.vars.radius.md,
        }),
      },
    },
    JoyBadge: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.vars.radius.md,
        }),
      },
    },
    JoyChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.vars.radius.md,
        }),
      },
    },
    JoyDivider: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.vars.radius.md,
        }),
      },
    },
    JoyIconButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.vars.radius.md,
        }),
      },
    },
  },
});

export default theme;