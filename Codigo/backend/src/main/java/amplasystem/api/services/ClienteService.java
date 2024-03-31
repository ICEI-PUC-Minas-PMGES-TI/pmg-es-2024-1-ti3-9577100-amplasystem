package amplasystem.api.services;

import amplasystem.api.dtos.cliente.ClienteDTO;
import amplasystem.api.exceptions.EntityAlreadyExistsException;
import amplasystem.api.mappers.ClienteMapper;
import amplasystem.api.models.Cliente;
import amplasystem.api.repositories.ClienteRepository;
import amplasystem.api.services.exceptions.ObjectNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Transactional
@Service
public class ClienteService {
    @Autowired
    private ClienteRepository clienteRepository;

    public ClienteDTO update(Cliente cliente) {
        if (clienteRepository.existsById(cliente.getId()))
            return ClienteMapper.toDTO(clienteRepository.save(cliente));
        else
            throw new ObjectNotFoundException("Cliente não encontrada na base de dados");
    }

    public ClienteDTO getById(Integer id) throws ObjectNotFoundException {
        Cliente cliente = clienteRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException("Cliente não encontrada na base de dados"));
        return ClienteMapper.toDTO(cliente);
    }

    public ClienteDTO save(Cliente cliente) throws ObjectNotFoundException {
        if (clienteRepository.existsByCnpj(cliente.getCnpj()))
            throw new EntityAlreadyExistsException("CNJP de cliente já cadastrado na base de dados");

        return ClienteMapper.toDTO(clienteRepository.save(cliente));
    }

    public void delete(Integer id) {
        clienteRepository.deleteById(id);
    }

    public List<ClienteDTO> getAllClientes() {
        return clienteRepository.findAll().stream().map(ClienteMapper::toDTO).collect(Collectors.toList());
    }

}
