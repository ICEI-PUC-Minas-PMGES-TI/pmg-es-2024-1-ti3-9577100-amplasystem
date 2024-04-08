package amplasystem.api.dtos.cliente;

import amplasystem.api.dtos.VendedorDTO;
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
public class ResponseClienteDTO {
    private Integer id;
    private String nomeFantasia;
    private String cnpj;
    private String telefone;
    private VendedorDTO vendedor;
    private Endereco endereco;
//    private List<OrdemDeCompra> ordemDeCompras;
}
