
export type EnderecoModel = {
    id: number | null;
    cep: string;
    estado: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: number;
    complemento: string | null;
}