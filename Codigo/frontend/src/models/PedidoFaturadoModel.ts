import { financeiroDTOModels } from "./FinanceiroDTOModels";
import { OrdemDeCompraModel } from "./OrdemDeCompraModel";

export interface PedidoFaturadoModel {
    id:number
    dataFaturamento:Date,
    dataVencimento:Date,
    valorFaturado:number,
    valorLiquido:number,//calculado baseado no valor faturado * a porcentagem de comissão da industria 
    notaFiscal:string,
    ordemDeCompra:OrdemDeCompraModel,
    financeiro:financeiroDTOModels
}