package amplasystem.api.dtos.cliente;

import amplasystem.api.dtos.VendedorDTO;
import amplasystem.api.models.Endereco;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResponseClienteDTO {
    private Integer id;
    private String nomeFantasia;
    private String cnpj;
    private String telefone;
    private VendedorDTO vendedor;
    private Endereco endereco;
//    private List<OrdemDeCompra> ordemDeCompras;
}
