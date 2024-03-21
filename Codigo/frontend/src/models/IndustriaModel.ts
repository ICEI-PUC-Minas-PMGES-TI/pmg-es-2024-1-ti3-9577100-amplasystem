import { ContatoModel } from './ContatoModels';

export interface IndustriaModel {
    id: number;
    nome: string;
    contatos: Array<ContatoModel>;
}
