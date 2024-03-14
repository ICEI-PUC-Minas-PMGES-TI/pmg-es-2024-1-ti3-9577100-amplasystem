package amplasystem.api.dtos;

import amplasystem.api.enuns.Cargo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class VendedorDTO {
    private Integer id;
    private String nome;
    private String email;
    private Cargo cargo;
}