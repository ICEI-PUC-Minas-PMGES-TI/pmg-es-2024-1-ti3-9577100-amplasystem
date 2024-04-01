import { VendedorModel } from "@/models/VendedorModel";

export type ClienteModel = {
    id: number | null;
    cnpj: string;
    telefone: string; 
    cidade: string; 
    endereco: string; 
    nomeFantasia: string; 
    vendedor: VendedorModel; 
}