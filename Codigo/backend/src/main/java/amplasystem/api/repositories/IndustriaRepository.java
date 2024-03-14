package amplasystem.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import amplasystem.api.models.Industria;

@Repository
public interface IndustriaRepository extends JpaRepository<Industria, Integer> {
    boolean existsByNome(String nome);
}
