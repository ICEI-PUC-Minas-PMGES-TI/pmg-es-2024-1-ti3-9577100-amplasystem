package amplasystem.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import amplasystem.api.models.Telefone;

@Repository
public interface TelefoneRepository extends JpaRepository<Telefone, Integer> {

}
 