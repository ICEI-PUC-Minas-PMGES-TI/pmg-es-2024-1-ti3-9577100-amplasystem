import * as colors from './Colors';

export const menuButton = {
    borderRadius: 0,
    margin: 0,
    width: '100%',
    backgroundColor: colors.buttonColor,
    ':hover': {
        backgroundColor: colors.buttonHoverColor,
        color: '#4F46E5',
    },
};

export const optionMenu = {
    mt: 2,
    backgroundColor: colors.buttonColor,
    ':hover': {
        backgroundColor: colors.buttonHoverColor,
        fontWeight: 'bold',
        color: '#4F46E5',
    },
};
export const greenButton = {
    mt: 2,
    maxWidth: 720,
    width: '100%',
    height: 55,
    ':hover': {
        backgroundColor: colors.buttonHoverColor,
        fontWeight: 'bold',
        color: '#4F46E5',
    },
};

export const whiteButton = {
    mt: 2,
    maxWidth: 720,
    backgroundColor: '#FFFFFF',
    color: 'black',
    width: '100%',
    height: 50,
    ':hover': {
        backgroundColor: '#EEF2FF',
        fontWeight: 'bold',
        color: '#6B7280',
    },
};

export const closeButton = {
    padding: 0,
    height: '10px',
    position: 'fixed',
    top: 20,
    right: 20,
};
export const addButton = {
    height: '45px',
    backgroundColor: colors.buttonColor,
    ':hover': {
        backgroundColor: '#EEF2FF',
        fontWeight: 'bold',
        color: '#6B7280',
    },
};
export const iconButton = {
    height: '100%',
    color: 'white',
    ':hover': {
        fontWeight: 'bold',
        color: '#4F46E5',
    },
};
