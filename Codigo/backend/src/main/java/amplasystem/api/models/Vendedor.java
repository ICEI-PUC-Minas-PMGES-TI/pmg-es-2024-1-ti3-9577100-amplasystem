package amplasystem.api.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import amplasystem.api.enuns.Cargo;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Vendedor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;



    @Column(name = "email", nullable = false, length = 100, unique = true)
    @NotBlank(message = "Email do vendedor obrigatorio")
    private String email;

    @Column(name = "senha", nullable = false)
    @NotBlank(message = "Senha do vendedor obrigatorio")
    private String senha;

    @Column(name = "nome", nullable = false, length = 80)
    @NotBlank(message = "Nome do vendedor obrigatorio")
    private String nome;

    @Column(name = "cargo", nullable = false)
    private Cargo cargo;

    @OneToMany(mappedBy = "vendedor")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<Cliente> clientes;

}
 