package amplasystem.api.dtos;

import amplasystem.api.models.Endereco;
import amplasystem.api.models.OrdemDeCompra;
import amplasystem.api.models.Vendedor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ClienteDTO {
    private Integer id;
    private String nomeFantasia;
    private String cnpj;
    private Vendedor vendedor;
    private List<OrdemDeCompra> ordemDeCompras;
    private Endereco endereco;

}
