package amplasystem.api.services;

import amplasystem.api.dtos.cliente.ResponseClienteDTO;
import amplasystem.api.dtos.cliente.RequestClientDTO;
import amplasystem.api.exceptions.EntityAlreadyExistsException;
import amplasystem.api.exceptions.ObjectNotFoundException;
import amplasystem.api.mappers.ClienteMapper;
// import amplasystem.api.mappers.VendedorMapper;
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
        Vendedor vendedor = vendedorRepository.findById(cliente.getIdVendedor())
                .orElseThrow(() -> new ObjectNotFoundException("Vendedor não encontrada na base de dados"));

        cliente.setCnpj(cliente.getCnpj().replaceAll("[^0-9]", ""));

        if (!clienteRepository.existsById(cliente.getId()))
            throw new ObjectNotFoundException("Cliente não encontrada na base de dados");

        Cliente cliente2 = ClienteMapper.toEntity(cliente);

        // add vendedor
        cliente2.setVendedor(vendedor);
        // add endereco
        cliente2.setEndereco(cliente.getEndereco());
        clienteRepository.save(cliente2);
        return ClienteMapper.toDTO(cliente2);
    }

    public Cliente getById(Integer id) throws ObjectNotFoundException {
        return clienteRepository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Cliente não encontrada na base de dados"));
    }

    public ResponseClienteDTO save(RequestClientDTO requestClienteDTO) throws ObjectNotFoundException {
        Vendedor vendedor = vendedorRepository.findById(requestClienteDTO.getIdVendedor())
                .orElseThrow(() -> new ObjectNotFoundException("Vendedor não encontrado na base de dados"));

        requestClienteDTO.setCnpj(requestClienteDTO.getCnpj().replaceAll("[^0-9]", ""));

        if (clienteRepository.existsByCnpj(requestClienteDTO.getCnpj()))
            throw new EntityAlreadyExistsException("CNJP de cliente já cadastrado na base de dados");

        Cliente cliente = ClienteMapper.toEntity(requestClienteDTO);
        cliente.setVendedor(vendedor);

        ResponseClienteDTO responseClienteDTO = ClienteMapper.toDTO(clienteRepository.save(cliente));

        return responseClienteDTO;
    }

    public ResponseClienteDTO save(Cliente client) throws ObjectNotFoundException {

        client.setCnpj(client.getCnpj().replaceAll("[^0-9]", ""));

        if (clienteRepository.existsByCnpj(client.getCnpj()))
            throw new EntityAlreadyExistsException("CNJP de cliente já cadastrado na base de dados");

        ResponseClienteDTO responseClienteDTO = ClienteMapper.toDTO(clienteRepository.save(client));

        return responseClienteDTO;
    }

    public void delete(Integer id) {
        clienteRepository.deleteById(id);
    }

    public List<ResponseClienteDTO> getAllClientes() {
        return clienteRepository.findAll().stream().map(ClienteMapper::toDTO).collect(Collectors.toList());
    }

    public void createTable(MultipartFile file)
            throws ObjectNotFoundException, NullPointerException, NumberFormatException, EncryptedDocumentException,
            IOException {
        // List<Cliente> clientes = new ArrayList<>();

        InputStream inputStream = file.getInputStream();

        try (Workbook workbook = new XSSFWorkbook(inputStream)) {
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
                String cep = null;
                String estado = null;
                String cidade = null;
                String bairro = null;
                String rua = null;
                Integer numero = null;
                String complemento = null;

                while (celIterator.hasNext()) {
                    Cell cell = celIterator.next();
                    int columnIndex = cell.getColumnIndex();

                    if (columnIndex != 2
                            && (cell.getStringCellValue().isEmpty() || cell.getStringCellValue() == null)) {
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
                            cep = cell.getStringCellValue();
                            break;

                        case 5:
                            estado = cell.getStringCellValue();
                            break;

                        case 6:
                            cidade = cell.getStringCellValue();
                            break;

                        case 7:
                            bairro = cell.getStringCellValue();
                            break;

                        case 8:
                            rua = cell.getStringCellValue();
                            break;

                        case 9:
                            numero = Integer.parseInt(cell.getStringCellValue());
                            break;

                        case 10:
                            complemento = cell.getStringCellValue();
                            break;

                        default:
                            break;
                    }
                }

                Endereco newEnderecoCliente = new Endereco(null, cep, estado, cidade, bairro, rua, numero, complemento);
                Vendedor vendedor = vendedorService.findByEmail(email);

                if (vendedor == null) {
                    throw new ObjectNotFoundException("Vendedor de email " + email + " não encontrado");
                }

                Cliente newCliente = new Cliente(null, nomeFantasia, cnpj, vendedor, new ArrayList<>(), telefone,
                        newEnderecoCliente);

                this.save(newCliente);
            }

            workbook.close();
        }

    }

}
