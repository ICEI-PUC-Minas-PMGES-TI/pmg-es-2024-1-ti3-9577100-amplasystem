package amplasystem.api.dtos;

import amplasystem.api.enuns.Faturamento;
import amplasystem.api.enuns.TipoFiscal;

public record FinanceiroDTO(Integer id, Double comisao, Faturamento faturamento, TipoFiscal tipoFiscal,
        String industria) {

}
