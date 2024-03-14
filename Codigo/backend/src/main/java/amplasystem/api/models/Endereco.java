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

    @Column(name = "cidade", nullable = false, length = 60)
    @NotBlank(message = "Cidade no endereço é obrigatoria")
    private String cidade;

    @Column(name = "rua", nullable = false, length = 60)
    @NotBlank(message = "Cidade no endereço é obrigatoria")
    private String rua;
    
}
