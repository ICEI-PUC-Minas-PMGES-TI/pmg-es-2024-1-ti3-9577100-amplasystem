package amplasystem.api.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

import amplasystem.api.dtos.FinanceiroDTO;
import amplasystem.api.exceptions.ObjectNotFoundException;
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
        Industria industriaDoFinanceiro = industriaService.findByNome(financeiroDTO.getIndustria().getNome());

        Financeiro newFinanceiro = new Financeiro(null, financeiroDTO.getComissao(),
                financeiroDTO.getTipoPagamento(), financeiroDTO.getTipoFiscal(), industriaDoFinanceiro);
                
        industriaDoFinanceiro.setFinanceiro(newFinanceiro);
        return financeiroRepository.save(newFinanceiro);
    }

    public void delete(Integer id) {
        Optional<Financeiro> financeiroOptional = financeiroRepository.findById(id);
        financeiroOptional.ifPresent(financeiro -> financeiroRepository.delete(financeiro));
    }

    public FinanceiroDTO update(Integer id, FinanceiroDTO financeiroDTO) {
        try {
            financeiroRepository.findById(id).orElseThrow(() -> new NotFoundException());

            Industria industriaDoFinanceiro = industriaService.findByNome(financeiroDTO.getIndustria().getNome());

            Financeiro newFinanceiro = new Financeiro(id, financeiroDTO.getComissao(),
                    financeiroDTO.getTipoPagamento(), financeiroDTO.getTipoFiscal(), industriaDoFinanceiro);

            financeiroRepository.save(newFinanceiro);

            return FinanceiroMapper.toDTO(newFinanceiro);
        } catch (NotFoundException e) {
            throw new ObjectNotFoundException("Requisição com ID " + id + " não encontrado.");
        }
    }

    public FinanceiroDTO getById(Integer id) throws ObjectNotFoundException {
        Financeiro financeiro = financeiroRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException("ID não encontrada na base de dados"));
        return FinanceiroMapper.toDTO(financeiro);
    }

    public FinanceiroDTO save(Financeiro financeiro) {
        return FinanceiroMapper.toDTO(financeiroRepository.save(financeiro));
    }

    public Financeiro getByIndustria(Industria industria) {
        Financeiro financeiro = financeiroRepository.findByIndustria(industria);
        return financeiro;
    }
}
