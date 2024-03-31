package amplasystem.api.services;

import amplasystem.api.dtos.ClienteDTO;
import amplasystem.api.dtos.VendedorDTO;
import amplasystem.api.mappers.ClienteMapper;
import amplasystem.api.mappers.VendedorMapper;
import amplasystem.api.models.Cliente;
import amplasystem.api.models.Vendedor;
import amplasystem.api.services.exceptions.ObjectNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import amplasystem.api.repositories.ClienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Transactional
@Service
public class ClienteService {
    @Autowired
    private ClienteRepository clienteRepository;
    public ClienteDTO updateCliente(Integer id, ClienteDTO clienteDTO) {
        return null;
    }

    public void deleteCliente(Integer id) {

    }

    private Cliente getById(Integer id) throws ObjectNotFoundException {
        return clienteRepository.findById(id).get();
    }
    public ClienteDTO deleteClienteById(Integer id) throws EntityNotFoundException {
        Cliente cliente = this.getById(id);
        this.clienteRepository.delete(cliente);

        return ClienteMapper.toDTO(cliente);
    }

    public ClienteDTO getClienteById(Integer id) throws ObjectNotFoundException {
        Cliente cliente = clienteRepository.findById(id).get();
        return ClienteMapper.toDTO(cliente);
    }

    public ClienteDTO createCliente(ClienteDTO clienteDTO) {
        return null;
    }

    public List<ClienteDTO> getAllClientes() {
        return clienteRepository.findAll().stream().map(ClienteMapper::toDTO).collect(Collectors.toList());
    }

    public void update(Cliente cliente) {
        Cliente clienteInBase = getById(cliente.getId());
        clienteRepository.save(cliente);
    }
}
