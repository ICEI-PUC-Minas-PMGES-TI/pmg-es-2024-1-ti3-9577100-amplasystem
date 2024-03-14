package amplasystem.api.repositories;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import amplasystem.api.models.Contato;

@Repository
public interface ContatoRepository  extends JpaRepository<Contato, Integer> {

}
