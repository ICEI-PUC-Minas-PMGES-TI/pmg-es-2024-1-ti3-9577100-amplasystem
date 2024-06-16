package amplasystem.api.dtos;

import java.time.LocalDate;

import amplasystem.api.models.Financeiro;
import amplasystem.api.models.OrdemDeCompra;
import amplasystem.api.models.PedidoFaturado;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PedidoFaturadoWithFinanceiro extends PedidoFaturado {

    Financeiro financeiro;

    public PedidoFaturadoWithFinanceiro(Integer id, LocalDate dataFaturamento, Double valorFaturado, String notaFiscal,
            LocalDate dataVencimento, Double valorLiquido, OrdemDeCompra ordemDeCompra, Financeiro financeiro) {
        super(id, dataFaturamento, valorFaturado, notaFiscal, dataVencimento, valorLiquido, ordemDeCompra);
        this.financeiro = financeiro;
    }

}