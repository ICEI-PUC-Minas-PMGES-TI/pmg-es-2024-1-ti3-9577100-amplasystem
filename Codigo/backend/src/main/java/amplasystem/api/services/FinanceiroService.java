package amplasystem.api.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

import amplasystem.api.dtos.FinanceiroDTO;
import amplasystem.api.mappers.FinanceiroMapper;
import amplasystem.api.models.Financeiro;
import amplasystem.api.models.Industria;
import amplasystem.api.repositories.FinanceiroRepository;
import jakarta.transaction.Transactional;

@Transactional
@Service
public class FinanceiroService {

    @Autowired
    private FinanceiroRepository financeiroRepository;

    @Autowired
    private IndustriaService industriaService;

    public List<FinanceiroDTO> findAll() {
        List<FinanceiroDTO> result = new ArrayList<>();

        for (Financeiro finances : financeiroRepository.findAll()) {
            result.add(FinanceiroMapper.toDTO(finances));
        }

        return result;

    }

    public Financeiro create(FinanceiroDTO financeiroDTO) {
        financeiroDTO.setId(null);
        Industria industriaDoFinanceiro = industriaService.findByNome(financeiroDTO.getIndustria());

        Financeiro newFinanceiro = new Financeiro(null, financeiroDTO.getComissao(),
                financeiroDTO.getFaturamento(), financeiroDTO.getTipoFiscal(), industriaDoFinanceiro);
                
        industriaDoFinanceiro.setFinanceiro(newFinanceiro);
        return financeiroRepository.save(newFinanceiro);
    }

    public void delete(Integer id) {
        Optional<Financeiro> financeiroOptional = financeiroRepository.findById(id);
        financeiroOptional.ifPresent(financeiro -> financeiroRepository.delete(financeiro));
    }

    public void update(Integer id, FinanceiroDTO financeiroDTO) throws NotFoundException {
        financeiroRepository.findById(id).orElseThrow(() -> new NotFoundException());

        Industria industriaDoFinanceiro = industriaService.findByNome(financeiroDTO.getIndustria());

        Financeiro newFinanceiro = new Financeiro(id, financeiroDTO.getComissao(),
                financeiroDTO.getFaturamento(), financeiroDTO.getTipoFiscal(), industriaDoFinanceiro);

        financeiroRepository.save(newFinanceiro);
    }

}
