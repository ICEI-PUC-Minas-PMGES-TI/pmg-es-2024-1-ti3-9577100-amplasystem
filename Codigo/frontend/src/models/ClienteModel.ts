import { VendedorModel } from "@/models/VendedorModel";
import { EnderecoModel } from "./EnderecoModel";

export type ClienteModel = {
    id: number | null;
    cnpj: string;
    telefone: string; 
    cidade: string; 
    endereco: EnderecoModel; 
    nomeFantasia: string; 
    vendedor: VendedorModel ; 
}