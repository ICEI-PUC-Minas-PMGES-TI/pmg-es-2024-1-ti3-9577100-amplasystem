import styled from 'styled-components';
import * as colors from './Colors';
export const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export const input = {
    marginBottom: '20px',
    borderRadius: '8px',
    maxWidth: 720,
    background: 'white',
    '& .MuiFormHelperText-contained': {
        background: colors.backgroundColor,
        margin: 0,
        fontWeight: 'bold',
        paddingTop: '3px',
        paddingRight: '14px',
        paddingBottom: 0,
        paddingLeft: ' 14px',
    },
};
