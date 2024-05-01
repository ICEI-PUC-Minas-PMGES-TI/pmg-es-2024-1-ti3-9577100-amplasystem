package amplasystem.api.mappers;



import amplasystem.api.dtos.PedidoFaturadoWithFinanceiro;
import amplasystem.api.models.Financeiro;
import amplasystem.api.models.PedidoFaturado;

public class PedidoFaturadoWithFinaceiroMapper {
    public static PedidoFaturadoWithFinanceiro toDTO(PedidoFaturado p, Financeiro f) {
        return new PedidoFaturadoWithFinanceiro(p.getId(), p.getDataFaturamento(), p.getValorFaturado(),
                p.getNotaFiscal(), p.getDataVencimento(), p.getValorLiquido(), p.getOrdemDeCompra(), f);
    }
}
