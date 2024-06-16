import { extendTheme } from '@mui/joy/styles';

const ibmTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidBg: '#0f62fe', // Primary button background
          solidHoverBg: '#0353e9', // Primary button hover
          solidActiveBg: '#002d9c', // Primary button active
          softColor: '#0f62fe', // Soft text color
          softBg: 'rgba(15, 98, 254, 0.1)', // Soft background color
          softHoverBg: 'rgba(15, 98, 254, 0.2)', // Soft hover background
          softActiveBg: 'rgba(15, 98, 254, 0.3)', // Soft active background
          outlinedColor: '#0f62fe', // Outlined button text color
          outlinedBorder: '#0f62fe', // Outlined button border color
          outlinedHoverBg: 'rgba(15, 98, 254, 0.1)', // Outlined button hover background
          outlinedHoverBorder: '#0353e9', // Outlined button hover border color
          outlinedActiveBg: 'rgba(15, 98, 254, 0.2)', // Outlined button active background
        },
        neutral: {
          solidBg: '#393939', // Neutral button background
          solidHoverBg: '#2b2b2b', // Neutral button hover
          solidActiveBg: '#212121', // Neutral button active
          softColor: '#393939', // Soft text color
          softBg: 'rgba(57, 57, 57, 0.1)', // Soft background color
          softHoverBg: 'rgba(57, 57, 57, 0.2)', // Soft hover background
          softActiveBg: 'rgba(57, 57, 57, 0.3)', // Soft active background
          outlinedColor: '#393939', // Outlined button text color
          outlinedBorder: '#393939', // Outlined button border color
          outlinedHoverBg: 'rgba(57, 57, 57, 0.1)', // Outlined button hover background
          outlinedHoverBorder: '#2b2b2b', // Outlined button hover border color
          outlinedActiveBg: 'rgba(57, 57, 57, 0.2)', // Outlined button active background
        },
      },
    },
    dark: {
      palette: {
        primary: {
          solidBg: '#4589ff',
          solidHoverBg: '#1a73e8',
          solidActiveBg: '#0043ce',
          softColor: '#4589ff',
          softBg: 'rgba(69, 137, 255, 0.1)',
          softHoverBg: 'rgba(69, 137, 255, 0.2)',
          softActiveBg: 'rgba(69, 137, 255, 0.3)',
          outlinedColor: '#4589ff',
          outlinedBorder: '#4589ff',
          outlinedHoverBg: 'rgba(69, 137, 255, 0.1)',
          outlinedHoverBorder: '#1a73e8',
          outlinedActiveBg: 'rgba(69, 137, 255, 0.2)',
        },
        neutral: {
          solidBg: '#6f6f6f',
          solidHoverBg: '#525252',
          solidActiveBg: '#393939',
          softColor: '#6f6f6f',
          softBg: 'rgba(111, 111, 111, 0.1)',
          softHoverBg: 'rgba(111, 111, 111, 0.2)',
          softActiveBg: 'rgba(111, 111, 111, 0.3)',
          outlinedColor: '#6f6f6f',
          outlinedBorder: '#6f6f6f',
          outlinedHoverBg: 'rgba(111, 111, 111, 0.1)',
          outlinedHoverBorder: '#525252',
          outlinedActiveBg: 'rgba(111, 111, 111, 0.2)',
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
          borderRadius: '0px',
          fontWeight: 600,
          ...(ownerState.size === 'md' && {
            minHeight: '36px',
            fontSize: '14px',
            paddingInline: '18px',
          }),
          '&:active': {
            transform: 'translateY(1px)',
          },
        }),
      },
    },
    JoyInput: {
      styleOverrides: {
        root: {
          borderRadius: '0px',
        },
      },
    },
    JoySelect: {
      styleOverrides: {
        root: {
          borderRadius: '0px',
        },
        listbox: {
          borderRadius: '0px',
        },
      },
    },
    JoyCheckbox: {
      styleOverrides: {
        root: {
          borderRadius: '0px',
        },
      },
      defaultProps: {
        sx: {
          borderRadius: '0px !important',
          display: 'none',
        },
      },
    },
    JoyRadio: {
      styleOverrides: {
        root: {
          borderRadius: '0px',
        },
      },
    },
    JoySwitch: {
      styleOverrides: {
        root: {
          borderRadius: '0px',
        },
      },
    },
    JoySlider: {
      styleOverrides: {
        root: {
          borderRadius: '0px',
        },
      },
    },
    JoyTextarea: {
      styleOverrides: {
        root: {
          borderRadius: '0px',
        },
      },
    },
    JoyAvatar: {
      styleOverrides: {
        root: {
          borderRadius: '0px',
        },
      },
    },
    JoyBadge: {
      styleOverrides: {
        root: {
          borderRadius: '0px',
        },
      },
    },
    JoyChip: {
      styleOverrides: {
        root: {
          borderRadius: '0px',
        },
      },
    },
    JoyDivider: {
      styleOverrides: {
        root: {
          borderRadius: '0px',
        },
      },
    },
    JoyIconButton: {
      styleOverrides: {
        root: {
          borderRadius: '0px',
        },
      },
    },
    JoySheet: {
      styleOverrides: {
        root: {
          borderRadius: '0px',
        },
      },
    },
    JoyTable: {
      styleOverrides: {
        root: {
          borderRadius: '0px',
        },
      },
    },
  },
});

export default ibmTheme;