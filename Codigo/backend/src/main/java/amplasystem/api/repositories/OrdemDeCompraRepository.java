package amplasystem.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import amplasystem.api.models.OrdemDeCompra;

@Repository
public interface OrdemDeCompraRepository extends JpaRepository<OrdemDeCompra, Integer> {
    boolean existsBycodigoPedido(String codigoPedido);
}
