package amplasystem.api.dtos;

import amplasystem.api.models.Contato;
import amplasystem.api.models.Financeiro;
import amplasystem.api.models.OrdemDeCompra;
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
    private Financeiro financeiro;
    private List<OrdemDeCompra> ordemDeCompras;
    private List<ContatoDto> contatos;
}