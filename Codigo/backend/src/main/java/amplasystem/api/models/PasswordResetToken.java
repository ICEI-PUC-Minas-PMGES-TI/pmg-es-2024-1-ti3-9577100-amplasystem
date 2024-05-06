package amplasystem.api.models;


import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PasswordResetToken {
 
    public PasswordResetToken(String token, Vendedor vendedor) {
       this.token = token;
       this.vendedor = vendedor;
    }

 
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
 
    private String token;
 
    @OneToOne(targetEntity = Vendedor.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "vendedor_id")
    private Vendedor vendedor;

}