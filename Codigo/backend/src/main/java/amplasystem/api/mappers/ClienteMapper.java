package amplasystem.api.mappers;

import amplasystem.api.dtos.cliente.ClienteDTO;
import amplasystem.api.dtos.cliente.RequestClientDTO;
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

    public static Cliente toEntity(RequestClientDTO cliente) {
        return new Cliente(
                cliente.getId(),
                cliente.getNomeFantasia(),
                cliente.getCnpj(),
                cliente.getEndereco()
        );
    }

}
