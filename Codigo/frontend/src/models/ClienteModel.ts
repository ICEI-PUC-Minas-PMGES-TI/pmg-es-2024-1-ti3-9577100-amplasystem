import { VendedorModel } from '@/models/VendedorModel';
import { EnderecoModel } from './EnderecoModel';

export type ClienteModel = {
    id: number | null;
    cnpj: string;
    nomeFantasia: string;
    telefone?: string;
    endereco: EnderecoModel;
    vendedor: VendedorModel;
};

export type ClienteFormModel = {
    id: number | null;
    cnpj: string;
    nomeFantasia: string;
    telefone?: string;
    endereco?: EnderecoModel;
    idVendedor: number;
};
