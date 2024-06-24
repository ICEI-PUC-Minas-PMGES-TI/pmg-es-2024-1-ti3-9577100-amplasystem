import { Cargo } from '@/enums/Cargo.ts';

export type Vendedor = {
    id?: number;
    nome: string;
    email: string;
    cargo: Cargo;
    token?: string;
}
