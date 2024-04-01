package amplasystem.api.dtos.cliente;

import amplasystem.api.models.Endereco;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.br.CNPJ;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RequestClientDTO {
    private Integer id;

    @NotBlank(message = "Nome fantasia é obrigatório")
    private String nomeFantasia;

    @NotBlank(message = "CNPJ é obrigatório")
    @CNPJ(message = "CNPJ inválido")
    private String cnpj;

    @NotNull(message = "Id do vendedor é obrigatório")
    private Integer idVendedor;

    private Endereco endereco;
}