package amplasystem.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import amplasystem.api.models.PasswordResetToken;
import amplasystem.api.models.Vendedor;

@Repository
public interface PasswordTokenRepository  extends JpaRepository<PasswordResetToken, Integer> {
    PasswordResetToken findByVendedorAndToken(Vendedor vendedor, String token);
    PasswordResetToken findByVendedor(Vendedor vendedor);
}