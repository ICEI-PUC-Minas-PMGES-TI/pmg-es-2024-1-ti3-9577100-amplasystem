package amplasystem.api.mappers;

import amplasystem.api.dtos.ContatoDto;

import amplasystem.api.models.Contato;

public class ContatoMapper {
    public static ContatoDto toDTO(Contato contato) {
        return new ContatoDto(
                contato.getId(),
                contato.getNome(),
                contato.getEmail(),
                contato.getTipoContato(),
                contato.getTelefone()
        );
    }
}