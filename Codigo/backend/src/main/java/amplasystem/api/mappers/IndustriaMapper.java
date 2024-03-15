package amplasystem.api.mappers;

import amplasystem.api.dtos.IndustriaDTO;
import amplasystem.api.models.Industria;


public class IndustriaMapper {
    public static IndustriaDTO toDTO(Industria industria) {
        return new IndustriaDTO(
                industria.getId(),
                industria.getNome(),
                industria.getFinanceiro(),
                industria.getOrdemDeCompras(),
                industria.getContatos()
        );
    }
}
