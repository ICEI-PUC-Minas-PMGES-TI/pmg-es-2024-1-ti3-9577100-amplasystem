package amplasystem.api.models;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PedidoFaturado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name = "data_faturamento", nullable = false)
    private LocalDate dataFaturamento;

    @Column(name = "valor_faturado", nullable = false)
    private Double valorFaturado;

    @Column(name = "notaFiscal", nullable = false, length = 45)
    @NotBlank(message = "Nota fiscal do Pedid faturado é obrigatora")
    private String notaFiscal;
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name = "data_vencimento", nullable = false)
    private LocalDate dataVencimento;
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @Column(name = "valor_liquido", nullable = false)
    private Double valorLiquido;

    @ManyToOne
    @JoinColumn(name = "ordemDeCompra_id")
    private OrdemDeCompra ordemDeCompra;

}
