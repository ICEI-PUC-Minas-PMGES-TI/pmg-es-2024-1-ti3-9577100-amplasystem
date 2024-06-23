import { OrderStatus } from '@/enums/OrderStatus';
import { Cliente } from './Cliente';
import { Industria } from './Industria';

export interface OrdemDeCompra {
    id: number | null;
    valor: number;
    codigoPedido: string;
    totalmenteFaturado: OrderStatus;
    industria: Industria;
    cliente: Cliente
    dataCadastro:string
}