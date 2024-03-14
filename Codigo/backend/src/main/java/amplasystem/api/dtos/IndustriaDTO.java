package amplasystem.api.dtos;

// ! import amplasystem.api.enuns.Cargo; Não utilizado
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
    private String contatoComercial;
    private String telefoneComercial;
    private String emailComercial;
    private String contatoLogistica;
    private String telefoneLogistica;
    private String emailLogistica;
    private String telefoneFinaceiro;
    private String emailFinanceiro;
    private String contatoPagamento;
    private String telefonePagamento;
    private String emailPagamento;
    private Financeiro financeiro;
    private List<OrdemDeCompra> ordemDeCompras;
}