package amplasystem.api.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import amplasystem.api.enuns.TipoContato;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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

    @Column(name = "telefone", nullable = true, columnDefinition = "CHAR(15)")
    @NotBlank(message = "telefone de telefone é obrigatório.")
    private String telefone; 

    @Column(name = "tipo_contato", nullable = false)
    TipoContato tipoContato;

    @ManyToOne
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @JoinColumn(name = "industria_id")
    private Industria industria;

    
    
}
