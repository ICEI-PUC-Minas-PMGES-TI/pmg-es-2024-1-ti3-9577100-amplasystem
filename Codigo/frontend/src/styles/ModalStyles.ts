import styled from 'styled-components';

export const Modal = {
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
