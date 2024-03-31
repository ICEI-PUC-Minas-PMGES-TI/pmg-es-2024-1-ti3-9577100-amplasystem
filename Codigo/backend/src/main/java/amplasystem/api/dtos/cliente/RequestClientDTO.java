package amplasystem.api.dtos.cliente;

import amplasystem.api.models.Endereco;
import amplasystem.api.models.OrdemDeCompra;
import amplasystem.api.models.Vendedor;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RequestClientDTO {
    private Integer id;
    private String nomeFantasia;
    private String cnpj;

    @NotBlank(message = "Id vendedor é obrigatorio")
    private Integer idVendedor;
    private Endereco endereco;
}
