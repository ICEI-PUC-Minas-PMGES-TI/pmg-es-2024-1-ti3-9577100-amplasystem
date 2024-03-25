import styled from 'styled-components';

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
export const styles = styled('modal')({
    modalStyle1: {
        position: 'absolute',
        top: '10%',
        left: '10%',
        overflow: 'scroll',
        height: '100%',
        display: 'block',
    },
});

export const input = {
    marginBottom: '20px',
    borderRadius: '8px',
    maxWidth: 720,
    height: 65,
};

export const MODAL_STYLE = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    maxHeight: '80%',
    transform: 'translate(-50%,-50%)',
    padding: '50px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    color: 'black',
};
