import { Financeiro } from "./Financeiro";
import { OrdemDeCompra } from "./OrdemDeCompra";

export type PedidoFaturado = {
    id:number
    dataFaturamento: Date | string,
    dataVencimento: Date | string,
    valorFaturado: number,
    valorLiquido: number | null | undefined, //calculado baseado no valor faturado * a porcentagem de comissão da industria 
    notaFiscal: string,
    ordemDeCompra: OrdemDeCompra,
    financeiro: Financeiro | null | undefined
}