import { Contato } from './Contato';

export interface Industria {
    id?: number | null;
    nome: string;
    contatos: Contato[];
}
