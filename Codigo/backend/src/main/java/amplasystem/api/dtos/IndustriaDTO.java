package amplasystem.api.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class IndustriaDTO {
    private Integer id;
    private String nome;
    private List<ContatoDto> contatos;
}