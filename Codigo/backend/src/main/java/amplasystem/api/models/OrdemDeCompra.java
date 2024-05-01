package amplasystem.api.models;

import java.util.List;

import amplasystem.api.enuns.StatusOrder;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrdemDeCompra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "valor_ordem", nullable = false)
    private Double valor;

    @Column(name = "codigo_pedido", nullable = false, length = 45)
    @NotBlank(message = "Codigo pedido da Ordem de compra é obrigatória.")
    private String codigoPedido;

    @Column(name = "totalmente_faturada", nullable = false)
    private StatusOrder totalmenteFaturado;

    @Column(name = "data_cadastro", nullable = false)
    private String dataCadastro;

    @ManyToOne
    @JoinColumn(name = "industria_id")
    private Industria industria;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @OneToMany(mappedBy = "ordemDeCompra")
    private List<PedidoFaturado> pedidoFaturados;

}
