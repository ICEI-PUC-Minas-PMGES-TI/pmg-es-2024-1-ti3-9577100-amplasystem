package amplasystem.api.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Industria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nome", nullable = false, length = 100)
    @NotBlank(message = "Nome da indústria é obrigatório.")
    private String nome;

    @OneToOne(mappedBy = "industria")
    private Financeiro financeiro;

    @OneToMany(mappedBy = "industria")
    private List<OrdemDeCompra> ordemDeCompras;

    @OneToMany(mappedBy = "industria")
    private List<Contato> contatos;
}
