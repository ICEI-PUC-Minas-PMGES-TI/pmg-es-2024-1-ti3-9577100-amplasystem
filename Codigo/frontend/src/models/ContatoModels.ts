import { TipoContato } from '../enums/TipoContato';

export interface ContatoModel {
    id: number;
    nome: string;
    email: string;
    tipoContato: TipoContato;
    telefone: string;
}
