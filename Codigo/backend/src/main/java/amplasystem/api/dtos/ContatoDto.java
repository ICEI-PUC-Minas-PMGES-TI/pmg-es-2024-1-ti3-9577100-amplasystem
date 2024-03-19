package amplasystem.api.dtos;

import amplasystem.api.enuns.TipoContato;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContatoDto {
    private Integer id;
    private String nome;
    private String email;
    private TipoContato tipoContato;
    private String telefone;
}
