package amplasystem.api.services;

import amplasystem.api.services.exceptions.ObjectNotFoundException;
import amplasystem.api.dtos.IndustriaDTO;
import amplasystem.api.enuns.TipoContato;
import amplasystem.api.mappers.IndustriaMapper;
import amplasystem.api.models.Contato;
import amplasystem.api.models.Industria;
import amplasystem.api.models.Telefone;
import amplasystem.api.repositories.IndustriaRepository;
import jakarta.mail.Multipart;
import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ValidationException;
import jakarta.validation.Validator;
import lombok.extern.log4j.Log4j2;

import org.apache.poi.EncryptedDocumentException;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Transactional
@Service
@Log4j2
public class IndustriaService {
    @Autowired
    private IndustriaRepository industriaRepository;

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

        Industria industriaSalva = industriaRepository.save(industria);

        return IndustriaMapper.toDTO(industriaSalva);
    }

    public void delete(Integer id) {
        industriaRepository.deleteById(id);
    }

    public void update(Industria industria) {
        if (industriaRepository.existsById(industria.getId())) {
            industriaRepository.save(industria);
        } else {
            throw new ObjectNotFoundException("Indústria não encontrada na base de dados");
        }
    }

    public List<Industria> saveTable(MultipartFile file) {

        List<Industria> industrias = new ArrayList<>();

        try (InputStream inputStream = file.getInputStream()) {
            Workbook workbook = new XSSFWorkbook(inputStream);
            
            Sheet sheet = workbook.getSheetAt(0);
            Iterator<Row> iterator = sheet.iterator();

            iterator.next();

            while (iterator.hasNext()) {
                Row row = iterator.next();
                Iterator<Cell> celIterator = row.cellIterator();

                String nome = "";
                List<Contato> contatos = new ArrayList<>();

                while (celIterator.hasNext()) {
                    Cell cell = celIterator.next();
                    int columnIndex = cell.getColumnIndex();
                    
                    log.warn("Celula  " + columnIndex + ": " + cell.getStringCellValue());

                    switch (columnIndex) {
                        case 0:
                            if (cell.getStringCellValue().isEmpty() || cell.getStringCellValue() == null) {
                                throw new NullPointerException("Celula obrigatoria vazia");
                            }

                            nome = cell.getStringCellValue();
                            log.warn("Nome Fantasia recebeu seu valor");

                            break;

                        case 1:
                            log.warn("Primeiro contato sendo criado...");
                            createContato(TipoContato.Financeiro, celIterator, cell, contatos);
                            break;

                        case 4:
                            createContato(TipoContato.Comercial, celIterator, cell, contatos);
                            break;

                        case 7:
                            createContato(TipoContato.Logistica, celIterator, cell, contatos);
                            break;
                        
                        case 10:
                            createContato(TipoContato.Pagamento, celIterator, cell, contatos);
                            break;

                        default:
                            throw new RuntimeException("Index: " + columnIndex + " não é um dos valores tratados");
                    }

                }

                Industria newIndustria = new Industria(null, nome, contatos, null, null);

                for (Contato contato : contatos) {
                    contato.setIndustria(newIndustria);
                }

                industrias.add(newIndustria);
            }

            industriaRepository.saveAll(industrias);

            return industrias;

        } catch (EncryptedDocumentException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }

    private void createContato(TipoContato tipo, Iterator<Cell> celIterator, Cell cell, List<Contato> contatos) {
        if (cell.getStringCellValue().isEmpty() || cell.getStringCellValue() == null) {
            celIterator.next();
            celIterator.next();
            return;
        }

        String nomeContato = "";
        String email = "";
        Telefone telefone = new Telefone();

        log.warn("CONTATO: ");

        log.warn("nome: ");
        log.warn("tipo: " + cell.getCellType());
        log.warn("conteudo: " + cell.getStringCellValue() + "\n");
        nomeContato = cell.getStringCellValue();
        
        cell = celIterator.next();
        log.warn("telefone: ");
        log.warn("tipo: " + cell.getCellType());
        log.warn("conteudo: " + cell.getNumericCellValue() + "\n");
        telefone.setNumero(String.valueOf(cell.getNumericCellValue()));

        cell = celIterator.next();
        log.warn("email: ");
        log.warn("tipo: " + cell.getCellType());
        log.warn("conteudo: " + cell.getStringCellValue() + "\n");
        email = cell.getStringCellValue();
        

        Contato newContato = new Contato(null, nomeContato, email, TipoContato.Financeiro, null, telefone);

        contatos.add(newContato);
    }

}
