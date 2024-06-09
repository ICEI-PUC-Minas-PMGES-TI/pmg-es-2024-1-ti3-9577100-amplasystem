import { financeiroDTOModels } from "./FinanceiroDTOModels";
import { FinanceiroModel } from "./FinanceiroModel";
import { OrdemDeCompraModel } from "./OrdemDeCompraModel";

export interface PedidoFaturadoModel {
    id:number
    dataFaturamento:Date | string,
    dataVencimento:Date | string,
    valorFaturado:number,
    valorLiquido:number | null | undefined,//calculado baseado no valor faturado * a porcentagem de comissão da industria 
    notaFiscal:string,
    ordemDeCompra:OrdemDeCompraModel,
    financeiro:FinanceiroModel | null | undefined
}