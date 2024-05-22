package amplasystem.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import amplasystem.api.models.PedidoFaturado;
import amplasystem.api.models.OrdemDeCompra;

import java.time.LocalDate;
import java.util.List;


@Repository
public interface PedidoFaturadoRepository extends JpaRepository<PedidoFaturado, Integer> {

     
    List<PedidoFaturado> getByOrdemDeCompra(OrdemDeCompra ordemDeCompra);

    List<PedidoFaturado> findAllByDataVencimentoBetween(LocalDate initialDate, LocalDate finalDate);

}
