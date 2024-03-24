package amplasystem.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import amplasystem.api.models.Financeiro;
import amplasystem.api.repositories.FinanceiroRepository;
import jakarta.transaction.Transactional;

@Transactional
@Service
public class FinanceiroService {

    @Autowired
    public FinanceiroRepository financeiroRepository;

    public List<Financeiro> findAll() {
        return financeiroRepository.findAll();
    }
}
