package amplasystem.api.services;

import amplasystem.api.models.Contato;
import amplasystem.api.repositories.ContatoRepository;
import amplasystem.api.services.exceptions.ObjectNotFoundException;
import amplasystem.api.dtos.IndustriaDTO;
import amplasystem.api.mappers.IndustriaMapper;
import amplasystem.api.models.Industria;
import amplasystem.api.repositories.IndustriaRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ValidationException;
import jakarta.validation.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Transactional
@Service
public class IndustriaService {
    @Autowired
    private IndustriaRepository industriaRepository;
    @Autowired
    private ContatoService contatoService;
    @Autowired
    private Validator validator;

    public List<IndustriaDTO> getAllIndustrias() {
        return industriaRepository.findAll().stream().map(IndustriaMapper::toDTO).collect(Collectors.toList());
    }

    public IndustriaDTO getIndustriaById(Integer id) throws NoSuchElementException {
        Optional<Industria> industria = industriaRepository.findById(id);
        if (industria.isEmpty()) {
            throw new NoSuchElementException("Indústria não encontrada na base de dados");
        }

        return IndustriaMapper.toDTO(industria.get());
    }

    public IndustriaDTO save(Industria industria) {
        Set<ConstraintViolation<Industria>> violations = validator.validate(industria);
        if (!violations.isEmpty()) {
            throw new ValidationException(violations.stream()
                    .map(ConstraintViolation::getMessage)
                    .collect(Collectors.joining(", ")));
        }

        if (industriaRepository.existsByNome(industria.getNome())) {
            throw new IllegalStateException("Já existe uma indústria cadastrada com o mesmo nome.");
        }
        if (industria.getContatos() == null) {
            {
                industria.setContatos(new ArrayList<Contato>());
            }
        }
        Industria industriaSalva = industriaRepository.save(industria);
        industriaSalva.getContatos().forEach(contato -> {
            contato.setIndustria(industriaSalva);
            contatoService.save(contato);
        });
        return IndustriaMapper.toDTO(industriaSalva);
    }

    public void delete(Integer id) {
        industriaRepository.deleteById(id);
    }

    public void update(Industria industria) {
        if (industriaRepository.existsById(industria.getId())) {
            Industria industriaSalva = industriaRepository.save(industria);
            industria.getContatos().forEach(contato -> {
                contato.setIndustria(industriaSalva);
                contatoService.save(contato);
            });
        } else {
            throw new ObjectNotFoundException("Indústria não encontrada na base de dados");
        }
    }

}
