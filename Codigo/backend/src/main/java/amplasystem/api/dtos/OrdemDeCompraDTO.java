package amplasystem.api.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import amplasystem.api.enuns.StatusOrder;
import amplasystem.api.models.Cliente;
import amplasystem.api.models.PedidoFaturado;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrdemDeCompraDTO {

    private Integer id;

  
    private Double valorOrdem;

    private String codigoPedido;
    private StatusOrder totalmenteFaturada;


    private IndustriaDTO industria;

  
    private Cliente cliente;

    private List<PedidoFaturado> pedidoFaturados;
}
