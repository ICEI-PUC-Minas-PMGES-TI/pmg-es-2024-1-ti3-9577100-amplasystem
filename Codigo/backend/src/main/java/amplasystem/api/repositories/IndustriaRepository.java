package amplasystem.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import amplasystem.api.models.Industria;
import java.util.List;

@Repository
public interface IndustriaRepository extends JpaRepository<Industria, Integer> {
    boolean existsByNome(String nome);

    Industria findByNome(String nome);
}
