package amplasystem.api.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;
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
    @JoinColumn(name = "vendedor_id", nullable = false)
    private Vendedor vendedor;

    @OneToMany(mappedBy = "cliente")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<OrdemDeCompra> ordemDeCompras;

    @Column(name = "telefone", nullable = true, columnDefinition = "CHAR(15)")
    private String telefone;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true, optional = true)
    @JoinColumn(name = "endereco")
    private Endereco endereco;

    public Cliente(Integer id, String nomeFantasia, String cnpj, String telefone, Endereco endereco) {
        this.id = id;
        this.nomeFantasia = nomeFantasia;
        this.cnpj = cnpj;
        this.telefone = telefone;
        this.endereco = endereco;
    }
}
