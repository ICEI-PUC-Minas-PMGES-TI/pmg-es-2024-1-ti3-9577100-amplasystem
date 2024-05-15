package amplasystem.api.services;

import amplasystem.api.dtos.cliente.ResponseClienteDTO;
import amplasystem.api.dtos.cliente.RequestClientDTO;
import amplasystem.api.exceptions.EntityAlreadyExistsException;
import amplasystem.api.exceptions.ObjectNotFoundException;
import amplasystem.api.mappers.ClienteMapper;
import amplasystem.api.mappers.VendedorMapper;
import amplasystem.api.models.Cliente;
import amplasystem.api.models.Endereco;
import amplasystem.api.models.Vendedor;
import amplasystem.api.repositories.ClienteRepository;
import amplasystem.api.repositories.VendedorRepository;
import jakarta.transaction.Transactional;

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
import java.util.List;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.stream.Collectors;

@Transactional
@Service
public class ClienteService {
    
    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private VendedorRepository vendedorRepository;

    @Autowired
    private VendedorService vendedorService;

    public ResponseClienteDTO update(RequestClientDTO cliente) {
        Vendedor vendedor = vendedorRepository.findById(cliente.getId()).orElseThrow(() -> new ObjectNotFoundException("Cliente não encontrada na base de dados"));
        if (clienteRepository.existsByCnpj(cliente.getCnpj()))
            throw new EntityAlreadyExistsException("CNJP de cliente já cadastrado na base de dados");

        cliente.setCnpj(cliente.getCnpj().replaceAll("[^0-9]", ""));

        if (!clienteRepository.existsById(cliente.getId()))
            throw new ObjectNotFoundException("Cliente não encontrada na base de dados");


        ResponseClienteDTO responseClienteDTO = ClienteMapper.toDTO(clienteRepository.save(ClienteMapper.toEntity(cliente)));

        // add vendedor
        responseClienteDTO.setVendedor(VendedorMapper.toDTO(vendedor));
        // add endereco
        responseClienteDTO.setEndereco(cliente.getEndereco());

        return responseClienteDTO;
    }

    public Cliente getById(Integer id) throws ObjectNotFoundException {
        return clienteRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException("Cliente não encontrada na base de dados"));
    }

    public ResponseClienteDTO save(RequestClientDTO requestClienteDTO) throws ObjectNotFoundException {
        Vendedor vendedor = vendedorRepository.findById(requestClienteDTO.getIdVendedor()).orElseThrow(() -> new ObjectNotFoundException("Vendedor não encontrado na base de dados"));

        requestClienteDTO.setCnpj(requestClienteDTO.getCnpj().replaceAll("[^0-9]", ""));

        if (clienteRepository.existsByCnpj(requestClienteDTO.getCnpj()))
            throw new EntityAlreadyExistsException("CNJP de cliente já cadastrado na base de dados");


        Cliente cliente = ClienteMapper.toEntity(requestClienteDTO);
        cliente.setVendedor(vendedor);

        ResponseClienteDTO responseClienteDTO = ClienteMapper.toDTO(clienteRepository.save(cliente));


        return responseClienteDTO;
    }

    public void delete(Integer id) {
        clienteRepository.deleteById(id);
    }

    public List<ResponseClienteDTO> getAllClientes() {
        return clienteRepository.findAll().stream().map(ClienteMapper::toDTO).collect(Collectors.toList());
    }

    public void createTable(MultipartFile file) {
        List<Cliente> clientes = new ArrayList<>();

        try (InputStream inputStream = file.getInputStream()) {
            Workbook workbook = new XSSFWorkbook(inputStream);

            Sheet sheet = workbook.getSheetAt(0);
            Iterator<Row> iterator = sheet.iterator();

            iterator.next();

            while (iterator.hasNext()) {
                Row row = iterator.next();
                Iterator<Cell> celIterator = row.cellIterator();

                String nomeFantasia = null;
                String cnpj = null;
                String telefone = null;
                String email = null;
                String cidade = null; 
                String rua = null;

                while (celIterator.hasNext()) {
                    Cell cell = celIterator.next();
                    int columnIndex = cell.getColumnIndex();

                    //cell.setCellFormula("Text");

                    if(columnIndex != 2 && cell.getStringCellValue().isEmpty()) {
                        throw new NullPointerException("Dados da tabela inconsistentes em: " + cell.getAddress());
                    }


                    switch (columnIndex) {
                        case 0:
                            nomeFantasia = cell.getStringCellValue();
                            break;
                    
                        case 1:
                            cnpj = cell.getStringCellValue();
                            break;
                    
                        case 2:
                            telefone = cell.getStringCellValue();
                            break;

                        case 3:
                            email = cell.getStringCellValue();
                            break;
    
                        case 4:
                            cidade = cell.getStringCellValue();
                            break;

                        case 5:
                            rua = cell.getStringCellValue();
                            break;
                    
                        default:
                            break;
                    }
                }

                Endereco newEnderecoCliente = new Endereco();
                Vendedor vendedor = vendedorService.findByEmail(email);
                
                Cliente newCliente = new Cliente(null, nomeFantasia, cnpj, vendedor, new ArrayList<>(), telefone, newEnderecoCliente);

                clientes.add(newCliente);
            }

            clienteRepository.saveAll(clientes);
            workbook.close();

        } catch (EncryptedDocumentException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        catch(NullPointerException e) {
            e.printStackTrace();
        }
        catch(Exception e) {
            e.printStackTrace();
        }

        

    }

}
