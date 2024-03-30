package amplasystem.api.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

import amplasystem.api.dtos.FinanceiroDTO;
import amplasystem.api.mappers.FinanceiroMapper;
import amplasystem.api.models.Financeiro;
import amplasystem.api.models.Industria;
import amplasystem.api.repositories.FinanceiroRepository;
import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;

@Transactional
@Service
@Log4j2
public class FinanceiroService {

    @Autowired
    private FinanceiroRepository financeiroRepository;

    @Autowired
    private IndustriaService industriaService;

    public List<FinanceiroDTO> findAll() {
        List<FinanceiroDTO> result = new ArrayList<>();

        for (Financeiro f : financeiroRepository.findAll()) {
            result.add(FinanceiroMapper.toDTO(f));
        }

        return result;

    }

    public Financeiro create(FinanceiroDTO financeiroDTO) {
        log.warn("COMECO");
        log.warn(financeiroDTO.getId());
        financeiroDTO.setId(null);
        Industria industriaDoFinanceiro = industriaService.findByNome(financeiroDTO.getIndustria());
        log.warn(industriaDoFinanceiro);

        Financeiro newFinanceiro = new Financeiro(null, financeiroDTO.getComissao(),
                financeiroDTO.getFaturamento(), financeiroDTO.getTipoFiscal(), industriaDoFinanceiro);
                
        industriaDoFinanceiro.setFinanceiro(newFinanceiro);
        log.warn("Financeiro criado");
        return financeiroRepository.save(newFinanceiro);
    }

    public void delete(Integer id) {
        financeiroRepository.deleteById(id);
    }

    public void update(Integer id, FinanceiroDTO financeiroDTO) throws NotFoundException {
        financeiroRepository.findById(id).orElseThrow(() -> new NotFoundException());

        Industria industriaDoFinanceiro = industriaService.findByNome(financeiroDTO.getIndustria());

        Financeiro newFinanceiro = new Financeiro(id, financeiroDTO.getComissao(),
                financeiroDTO.getFaturamento(), financeiroDTO.getTipoFiscal(), industriaDoFinanceiro);

        financeiroRepository.save(newFinanceiro);
    }

}
