package amplasystem.api.dtos;

import amplasystem.api.enuns.Faturamento;
import amplasystem.api.enuns.TipoFiscal;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FinanceiroDTO {
        private Integer id;
        private Double comissao;
        private Faturamento faturamento;
        private TipoFiscal tipoFiscal;
        private String industria;

}
