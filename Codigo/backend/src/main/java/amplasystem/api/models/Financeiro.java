package amplasystem.api.models;

import amplasystem.api.enuns.Faturamento;
import amplasystem.api.enuns.TipoFiscal;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Financeiro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "comissao", nullable = false)
    private Double comissao;

    @Column(name = "faturamento", nullable = false)
    private Faturamento faturamento;

    @Column(name = "tipo_fiscal", nullable = false)
    private TipoFiscal tipoFiscal;
    
    @OneToOne
    @JoinColumn(name = "industria_id")
    private Industria industria;

}
