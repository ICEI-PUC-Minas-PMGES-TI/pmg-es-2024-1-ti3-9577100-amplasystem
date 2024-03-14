package amplasystem.api.models;

import amplasystem.api.enuns.TipoContato;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Contato {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Column(name = "nome", nullable = false, length = 45)
    @NotBlank(message = "Nome do contato é obrigatório.")
    String nome;

    @Column(name = "email", nullable = true, length = 100)
    String email;

    @Column(name = "tipo_contato", nullable = false)
    TipoContato tipoContato;

    @ManyToOne
    @JoinColumn(name = "industria_id")
    private Industria industria;

    @OneToOne
    @JoinColumn(name = "telefone_id")
    private Telefone telefone;
}
