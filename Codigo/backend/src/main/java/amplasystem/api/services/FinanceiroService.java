package amplasystem.api.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

        for (Financeiro f : financeiroRepository.findAll()) {
            result.add(FinanceiroMapper.toDTO(f));
        }

        return result;

    }

    public Financeiro create(FinanceiroDTO financeiroDTO) {
        Industria industriaDoFinanceiro = industriaService.findByNome(financeiroDTO.getIndustria());

        Financeiro newFinanceiro = new Financeiro(null, financeiroDTO.getComissao(),
                financeiroDTO.getFaturamento(), financeiroDTO.getTipoFiscal(), industriaDoFinanceiro);

        return financeiroRepository.save(newFinanceiro);
    }
}
