import { TipoContato } from '@/enums/TipoContato';

export interface ContatoModel {
    id: number | null;
    nome: string;
    email: string;
    tipoContato: TipoContato;
    telefone: string;
}
