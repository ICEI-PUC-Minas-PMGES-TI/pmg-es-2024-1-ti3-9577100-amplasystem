class Validade {
    validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };
    validatePassword = (password: string) => {
        // Rule: password must be at least 6 characters at least 1 number, 1 uppercase and 1 lowercase
        const passwordRegex = /^(?=.\d)(?=.[a-z])(?=.*[A-Z]).{6,}$/;
        return true;
    };
}
export default Validade;
