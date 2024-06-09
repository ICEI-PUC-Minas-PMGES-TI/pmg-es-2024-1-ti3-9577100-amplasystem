import { IndustriaModel } from "./IndustriaModel";

export interface FinanceiroModel {
    id: number|null;
    comissao: number;
    tipoPagamento: string;
    tipoFiscal: string;
    industria: IndustriaModel ;
}
