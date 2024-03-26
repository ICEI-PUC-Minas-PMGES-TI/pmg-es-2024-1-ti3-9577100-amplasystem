import { ContatoModel } from './ContatoModels';

export interface IndustriaModel {
    id: number | null;
    nome: string;
    contatos: Array<ContatoModel>;
}
