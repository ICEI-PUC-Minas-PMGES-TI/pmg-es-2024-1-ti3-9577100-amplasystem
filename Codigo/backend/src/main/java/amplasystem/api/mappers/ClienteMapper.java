package amplasystem.api.mappers;

import amplasystem.api.dtos.cliente.ResponseClienteDTO;
import amplasystem.api.dtos.cliente.RequestClientDTO;
import amplasystem.api.models.Cliente;


public class ClienteMapper {
    public static ResponseClienteDTO toDTO(Cliente cliente) {
        return new ResponseClienteDTO(
                cliente.getId(),
                cliente.getNomeFantasia(),
                cliente.getCnpj(),
                VendedorMapper.toDTO(cliente.getVendedor()),
//                cliente.getOrdemDeCompras(),
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
