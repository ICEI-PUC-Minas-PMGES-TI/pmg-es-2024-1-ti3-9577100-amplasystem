package amplasystem.api.dtos;

import amplasystem.api.enuns.Faturamento;
import amplasystem.api.enuns.TipoFiscal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FinanceiroDTO {
        private Integer id;
        private Double comissao;
        private Faturamento tipoPagamento;
        private TipoFiscal tipoFiscal;
        private IndustriaDTO industria;

}
