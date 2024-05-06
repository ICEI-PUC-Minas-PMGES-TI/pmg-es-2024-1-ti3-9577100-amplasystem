package amplasystem.api.services;

import amplasystem.api.models.Contato;
import amplasystem.api.repositories.ContatoRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ValidationException;
import jakarta.validation.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

import javax.swing.text.MaskFormatter;

@Transactional
@Service
public class ContatoService {

    @Autowired
    private ContatoRepository contatoRepository;

    @Autowired
    private Validator validator;

    public Contato save(Contato contato) {
        try {
            String phoneMask = "(##) #####-####";
            MaskFormatter maskFormatter = new MaskFormatter(phoneMask);
            maskFormatter.setValueContainsLiteralCharacters(false);
            contato.setTelefone(maskFormatter.valueToString(contato.getTelefone()));
        } catch (Exception e) {

        }
        Set<ConstraintViolation<Contato>> violations = validator.validate(contato);
        if (!violations.isEmpty()) {
            throw new ValidationException(violations.stream()
                    .map(ConstraintViolation::getMessage)
                    .collect(Collectors.joining(", ")));
        }

        return contatoRepository.save(contato);
    }
}
