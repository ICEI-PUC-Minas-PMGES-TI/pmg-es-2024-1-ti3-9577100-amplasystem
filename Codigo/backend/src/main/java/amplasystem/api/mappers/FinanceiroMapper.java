package amplasystem.api.mappers;

import amplasystem.api.dtos.FinanceiroDTO;
import amplasystem.api.models.Financeiro;

public class FinanceiroMapper {
    public static FinanceiroDTO toDTO(Financeiro financeiro) {
        return new FinanceiroDTO(
                financeiro.getId(),
                financeiro.getComissao(),
                financeiro.getTipoPagamento(),
                financeiro.getTipoFiscal(),
                IndustriaMapper.toDTO(financeiro.getIndustria())
        );
    }

}
