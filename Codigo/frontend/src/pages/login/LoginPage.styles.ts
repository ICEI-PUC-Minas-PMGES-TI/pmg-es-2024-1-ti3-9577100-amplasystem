// import styled components
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-image: linear-gradient(180deg, #285b71, #6feafb);
`;

export const Logo = styled.img`
    position: absolute;
    width: auto;
    height: auto;
    top: 0;
    left: 0;
    @media (max-width: 768px) {
        display: none;
    }
`;

export const LoginWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 300px;
    width: 100%;
    max-width: 70%;
    height: 100vh;
    border-radius: 40px 0 0 40px;
    gap: 10px;
    padding: 20px;
    background-color: white;

    @media (max-width: 1024px) {
        max-width: 60%;
    }

    @media (max-width: 768px) {
        max-width: 100%;
    }
`;

export const LoginTitle = styled.h1`
    margin-top: 140px;
    margin-bottom: 98px;
    font-size: 2rem;
    color: #4b4b4b;
    font-family: Inter;
    font-weight: bold;
`;

export const LoginForm = styled.form`
    display: flex;
    width: 90%;
    align-items: center;
    padding-start: 100px;
    padding-end: 100px;
    flex-direction: column;
    gap: 10px;
`;
