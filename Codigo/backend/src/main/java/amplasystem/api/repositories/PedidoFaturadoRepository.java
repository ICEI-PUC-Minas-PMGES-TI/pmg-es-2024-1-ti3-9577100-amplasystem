package amplasystem.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import amplasystem.api.models.PedidoFaturado;

@Repository
public interface PedidoFaturadoRepository extends JpaRepository<PedidoFaturado, Integer> {

}
