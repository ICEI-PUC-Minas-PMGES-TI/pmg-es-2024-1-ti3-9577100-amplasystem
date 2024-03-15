import { Cargo } from '../enums/Cargo.ts';

export interface VendedorModel {
    id: number;
    nome: string;
    email: string;
    cargo: Cargo;
    token?: string;
}
