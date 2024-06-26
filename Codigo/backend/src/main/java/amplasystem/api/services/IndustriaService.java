package amplasystem.api.services;

import amplasystem.api.models.Contato;
import amplasystem.api.enuns.TipoContato;
import amplasystem.api.exceptions.ObjectNotFoundException;
import amplasystem.api.models.Industria;
import amplasystem.api.repositories.IndustriaRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ValidationException;
import jakarta.validation.Validator;

import org.apache.poi.EncryptedDocumentException;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
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

    public List<Industria> getAllIndustrias() {
        return industriaRepository.findAll().stream().toList();
    }

    public List<Industria> getAllIndustriasWithOutFinanceiro() {
        return industriaRepository.findByFinanceiroIsNull().stream().toList();
    }
    public List<Industria> getAllIndustriasWithFinanceiro() {
        return industriaRepository.findByFinanceiroIsNotNull().stream().toList();
    }
    public Industria getIndustriaById(Integer id) throws NoSuchElementException {
        Optional<Industria> industria = industriaRepository.findById(id);
        if (industria.isEmpty()) {
            throw new NoSuchElementException("Indústria não encontrada na base de dados");
        }

        return industria.get();
    }

    public Industria save(Industria industria) {
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
        return industriaSalva;
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

    public List<Industria> createTable(MultipartFile file) {

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

                    switch (columnIndex) {
                        case 0:
                            if (cell.getStringCellValue().isEmpty() || cell.getStringCellValue() == null) {
                                throw new NullPointerException("Dados da tabela inconsistentes em: " + cell.getAddress());
                            }

                            nome = cell.getStringCellValue();

                            break;

                        case 1:
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
                    contatoService.save(contato);
                }

                industrias.add(newIndustria);
            }

            industriaRepository.saveAll(industrias);

            List<Industria> Industrias = new ArrayList<>();

            for (Industria industria : industrias) {
                Industrias.add(industria);
            }

              
            workbook.close();
            return Industrias;
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
        String telefone = "";
        nomeContato = cell.getStringCellValue();

        cell = celIterator.next();
        telefone = cell.getStringCellValue();
        cell = celIterator.next();
        email = cell.getStringCellValue();

        Contato newContato = new Contato(null, nomeContato, email, telefone, tipo, null);
        contatos.add(newContato);
    }

    public Industria findByNome(String nome) {
        return industriaRepository.findByNome(nome);
    }

    public Industria getById(Integer industriaId) {
        return industriaRepository.findById(industriaId).get();
    }

}
