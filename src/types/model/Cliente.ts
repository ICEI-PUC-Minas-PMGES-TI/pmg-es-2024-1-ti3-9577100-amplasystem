import { Vendedor } from '@/types/model/Vendedor';
import { Endereco } from '@/types/model/Endereco';

export type Cliente = {
    id: number | null;
    cnpj: string;
    nomeFantasia: string;
    telefone?: string;
    endereco?: Endereco;
    vendedor?: Vendedor;
    idVendedor?: number;
};