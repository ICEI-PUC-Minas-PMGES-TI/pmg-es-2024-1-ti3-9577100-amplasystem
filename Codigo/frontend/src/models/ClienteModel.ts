export interface ClienteModel {
    id: number | null;
    cnpj: string;
    telefone: string; 
    cidade: string; 
    endereco: string; 
    nome_fantasia: string; 
    vendedores_id: number; 
}