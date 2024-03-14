package amplasystem.api.mappers;



import amplasystem.api.dtos.VendedorDTO;
import amplasystem.api.models.Vendedor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class VendedorMapper {
    // Long id, String name, String telefone, String senha, String email, ERole

    public static VendedorDTO toDTO(Vendedor vendedor) {
        return new VendedorDTO(vendedor.getId(), vendedor.getNome(), vendedor.getEmail(),
                vendedor.getCargo());
    }
    public static Vendedor toVendedor(VendedorDTO vendedor) {
        return new Vendedor(vendedor.getId(), vendedor.getEmail(),null, vendedor.getNome(),
                vendedor.getCargo(),null);
    }
}
