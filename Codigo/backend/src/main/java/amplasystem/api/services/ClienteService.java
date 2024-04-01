package amplasystem.api.services;

import amplasystem.api.dtos.cliente.ResponseClienteDTO;
import amplasystem.api.dtos.cliente.RequestClientDTO;
import amplasystem.api.exceptions.EntityAlreadyExistsException;
import amplasystem.api.mappers.ClienteMapper;
import amplasystem.api.mappers.VendedorMapper;
import amplasystem.api.models.Cliente;
import amplasystem.api.models.Vendedor;
import amplasystem.api.repositories.ClienteRepository;
import amplasystem.api.repositories.VendedorRepository;
import amplasystem.api.services.exceptions.ObjectNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Transactional
@Service
public class ClienteService {
    private final ClienteRepository clienteRepository;

    private final VendedorRepository vendedorRepository;

    public ClienteService(ClienteRepository clienteRepository, VendedorRepository vendedorRepository) {
        this.clienteRepository = clienteRepository;
        this.vendedorRepository = vendedorRepository;
    }

    public ResponseClienteDTO update(RequestClientDTO cliente) {
        Vendedor vendedor = vendedorRepository.findById(cliente.getIdVendedor()).orElseThrow(() -> new ObjectNotFoundException("Vendedor não encontrado na base de dados"));

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

    public ResponseClienteDTO getById(Integer id) throws ObjectNotFoundException {
        Cliente cliente = clienteRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException("Cliente não encontrada na base de dados"));
        return ClienteMapper.toDTO(cliente);
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

}
