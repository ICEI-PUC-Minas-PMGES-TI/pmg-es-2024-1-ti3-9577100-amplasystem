package amplasystem.api.mappers;

import amplasystem.api.dtos.ContatoDto;
import amplasystem.api.dtos.IndustriaDTO;
import amplasystem.api.models.Industria;

import java.util.ArrayList;


public class IndustriaMapper {
    public static IndustriaDTO toDTO(Industria industria) {
        ArrayList<ContatoDto> contactsDTO = new ArrayList<>();

        industria.getContatos().forEach(contato -> {
            contactsDTO.add(ContatoMapper.toDTO(contato));
        });
        return new IndustriaDTO(
                industria.getId(),
                industria.getNome(),
                industria.getFinanceiro(),
                industria.getOrdemDeCompras(),
                contactsDTO
        );
    }
}
