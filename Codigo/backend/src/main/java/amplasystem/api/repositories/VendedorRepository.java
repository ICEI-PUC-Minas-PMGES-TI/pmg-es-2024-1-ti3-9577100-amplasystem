package amplasystem.api.repositories;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import amplasystem.api.models.Vendedor;

@Repository
@Transactional
public interface VendedorRepository extends JpaRepository<Vendedor, Integer> {
    Vendedor findByEmail(String email);

    boolean existsById(Integer id);

    Vendedor findByEmailAndSenha(String email, String senha);
    
}
 