package amplasystem.api.services;

import amplasystem.api.dtos.IndustriaDTO;
import amplasystem.api.mappers.IndustriaMapper;
import amplasystem.api.models.Contato;
import amplasystem.api.models.Industria;
import amplasystem.api.repositories.ContatoRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ValidationException;
import jakarta.validation.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Transactional
@Service
public class ContatoService {

    @Autowired
    private ContatoRepository contatoRepository;

    @Autowired
    private TelefoneService telefoneService;

    @Autowired
    private Validator validator;

    public Contato save(Contato contato) {
        Set<ConstraintViolation<Contato>> violations = validator.validate(contato);
        if (!violations.isEmpty()) {
            throw new ValidationException(violations.stream()
                    .map(ConstraintViolation::getMessage)
                    .collect(Collectors.joining(", ")));
        }

        telefoneService.save(contato.getTelefone());
        return contatoRepository.save(contato);
    }
}
