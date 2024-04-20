import { OrderStatus } from '@/enums/OrderStatus';
import { ClienteModel } from './ClienteModel';
import { IndustriaModel } from './IndustriaModel';

export interface OrdemDeCompraModel {
    id: number | null;
    valor: number;
    codigoPedido: string;
    totalmenteFaturado: OrderStatus;
    industria: IndustriaModel;
    cliente: ClienteModel
}