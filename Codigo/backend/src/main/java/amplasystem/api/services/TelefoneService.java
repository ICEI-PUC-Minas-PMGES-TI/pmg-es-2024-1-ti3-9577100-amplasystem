package amplasystem.api.services;

import amplasystem.api.models.Contato;
import amplasystem.api.models.Telefone;
import amplasystem.api.repositories.TelefoneRepository;
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
public class TelefoneService {

    @Autowired
    private Validator validator;

    @Autowired
    private TelefoneRepository telefoneRepository;

    public Telefone save(Telefone telefone) {
        Set<ConstraintViolation<Telefone>> violations = validator.validate(telefone);
        if (!violations.isEmpty()) {
            throw new ValidationException(violations.stream()
                    .map(ConstraintViolation::getMessage)
                    .collect(Collectors.joining(", ")));
        }


        return telefoneRepository.save(telefone);
    }
}
