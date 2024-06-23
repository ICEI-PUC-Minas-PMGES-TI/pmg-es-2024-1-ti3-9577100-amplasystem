import { TipoContato } from '@/enums/TipoContato';

export interface Contato {
    id: number | null;
    nome: string;
    email: string;
    tipoContato: TipoContato;
    telefone: string;
}
