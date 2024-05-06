package amplasystem.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import amplasystem.api.enuns.StatusOrder;
import amplasystem.api.models.Cliente;
import amplasystem.api.models.Industria;
import amplasystem.api.models.OrdemDeCompra;

@Repository
public interface OrdemDeCompraRepository extends JpaRepository<OrdemDeCompra, Integer> {
    boolean existsBycodigoPedido(String codigoPedido);

    List<OrdemDeCompra> findAllByClienteAndIndustriaAndTotalmenteFaturadoIsNot(Cliente cliente, Industria industria,StatusOrder totalmenteFaturado);

    List<OrdemDeCompra> findAllByClienteAndTotalmenteFaturadoIsNot(Cliente cliente,StatusOrder totalmenteFaturado);

    List<OrdemDeCompra> findAllByIndustriaAndTotalmenteFaturadoIsNot(Industria industria,StatusOrder totalmenteFaturado);

    List<OrdemDeCompra> findAllByTotalmenteFaturadoIsNot(StatusOrder totalmentefaturado);
    
}
