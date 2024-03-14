package amplasystem.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import amplasystem.api.models.Cliente;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

}
