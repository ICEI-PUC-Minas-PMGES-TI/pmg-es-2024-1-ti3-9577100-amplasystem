package amplasystem.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import amplasystem.api.models.Financeiro;

@Repository
public interface FinanceiroRepository extends JpaRepository<Financeiro, Integer> {

}
