export type Endereco = {
    id?: number | null;
    cep?: string;
    estado?: string;
    cidade?: string;
    bairro?: string;
    rua?: string;
    numero?: number | null;
    complemento?: string | null;
}