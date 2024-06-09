import { VendedorModel } from '@/types/VendedorModel';
import { EnderecoModel } from '@/types/EnderecoModel';

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
