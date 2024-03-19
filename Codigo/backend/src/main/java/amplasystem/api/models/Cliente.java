package amplasystem.api.models;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nome_fantasia", nullable = false, length = 100)
    @NotBlank(message = "Nome fantasia do cliente é obrigatorio")
    private String nomeFantasia;

    @Column(name = "cnpj", nullable = false, columnDefinition = "CHAR(14)")
    @NotBlank(message = "CNPJ do vendedor obrigatorio")
    private String cnpj;


    @ManyToOne
    @JoinColumn(name = "vendedor_id")
    private Vendedor vendedor;

    @OneToMany(mappedBy = "cliente")
    private List<OrdemDeCompra> ordemDeCompras;
    @Column(name = "telefone", nullable = true, columnDefinition = "CHAR(15)")
    @NotBlank(message = "telefone de telefone é obrigatório.")
    private String telefone; 

    @OneToOne
    @JoinColumn(name = "endereco")
    private Endereco endereco;
    
}
