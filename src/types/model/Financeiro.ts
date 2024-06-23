import { Industria } from "./Industria";

export interface Financeiro {
    id: number | null;
    comissao: number;
    tipoPagamento: string;
    tipoFiscal: string;
    industria?: Industria ;
}
