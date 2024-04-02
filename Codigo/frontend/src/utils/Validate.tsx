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
    validateCellphone = (cellphone: string) => {
        const cellphoneRegex = /^\((?:0?[1-9]{2})\)\s9\d{4}-\d{4}$/;
        return cellphoneRegex.test(cellphone);
    };
}
export default Validade;
 
export const formatPhoneNumber =  (phoneNumber: string)=> {
 const numericPhoneNumber = phoneNumber.replace(/\D/g, '');

        // Verificar o tamanho do número de telefone
        if (numericPhoneNumber.length >= 2 && numericPhoneNumber.length <= 11) {
            // Formatando com DDD
            let formattedPhoneNumber = '(' + numericPhoneNumber.substring(0, 2) + ') ';
            // Adicionando o restante do número
            if (numericPhoneNumber.length <= 7) {
                formattedPhoneNumber += numericPhoneNumber.substring(2);
            } else {
                formattedPhoneNumber += numericPhoneNumber.substring(2, 7) + '-' + numericPhoneNumber.substring(7);
            }
            return formattedPhoneNumber;
        } else {
            // Se o número de telefone não for válido, retornar o próprio número
            return phoneNumber;
        }
    }

