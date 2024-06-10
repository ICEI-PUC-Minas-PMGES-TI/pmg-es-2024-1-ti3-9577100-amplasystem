import { Cargo } from '@/enums/Cargo.ts';

export type VendedorModel = {
    id: number | null;
    nome: string;
    email: string;
    cargo: Cargo;
    token?: string;
}
