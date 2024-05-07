import { VendedorModel } from '@/models/VendedorModel';
import { EnderecoModel } from './EnderecoModel';

export type ClienteModel = {
    id: number | null;
    cnpj: string;
    telefone?: string;
    endereco: EnderecoModel;
    nomeFantasia: string;
    vendedor: VendedorModel;
};

export type ClienteFormModel = {
    id: number | null;
    nomeFantasia: string;
    cnpj: string;
    idVendedor: number;
    telefone?: string;
    endereco?: {
        id?: number | null;
        cidade?: string;
        rua?: string;
        // cep?: string;
        // estado?: string;
        // bairro?: string;
        // numero?: number;
        // complemento?: string | null;
    };
};
