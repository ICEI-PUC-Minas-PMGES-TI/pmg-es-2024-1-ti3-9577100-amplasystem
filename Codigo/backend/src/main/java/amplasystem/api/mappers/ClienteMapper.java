package amplasystem.api.mappers;

import amplasystem.api.dtos.cliente.ClienteDTO;
import amplasystem.api.models.Cliente;


public class ClienteMapper {
    public static ClienteDTO toDTO(Cliente cliente) {
        return new ClienteDTO(
                cliente.getId(),
                cliente.getNomeFantasia(),
                cliente.getCnpj(),
                cliente.getVendedor(),
                cliente.getOrdemDeCompras(),
                cliente.getEndereco()
        );
    }

}
