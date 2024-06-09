import { Cargo } from '@/enums/Cargo.ts';

export type VendedorModel = {
    id: number;
    nome: string;
    email: string;
    cargo: Cargo;
    token?: string;
}
