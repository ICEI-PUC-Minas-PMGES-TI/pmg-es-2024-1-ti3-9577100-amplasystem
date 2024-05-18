package amplasystem.api.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Endereco {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "cep", nullable = false, length = 8)
    @NotBlank(message = "CEP no endereço é obrigatorio")
    private String cep;

    @Column(name = "estado", nullable = false, length = 60)
    @NotBlank(message = "Estado no endereço é obrigatorio")
    private String estado;

    @Column(name = "cidade", nullable = false, length = 60)
    @NotBlank(message = "Cidade no endereço é obrigatoria")
    private String cidade;

    @Column(name = "bairro", nullable = false, length = 60)
    @NotBlank(message = "Bairro no endereço é obrigatorio")
    private String bairro;

    @Column(name = "rua", nullable = false, length = 60)
    @NotBlank(message = "Rua no endereço é obrigatorio")
    private String rua;

    @Column(name = "numero", nullable = false)
    private Integer numero;

    @Column(name = "complemento", nullable = true, length = 60)
    private String complemento;

}
