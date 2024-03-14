package amplasystem.api.models;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Telefone {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "numero", nullable = false, columnDefinition = "CHAR(15)")
    @NotBlank(message = "Numero de telefone é obrigatório.")
    private String numero; 
    


    // @OneToOne(mappedBy = "telefone")
    // private Contato contato;

    // @OneToOne(mappedBy = "telefone")
    // private Cliente cliente;

    
}
