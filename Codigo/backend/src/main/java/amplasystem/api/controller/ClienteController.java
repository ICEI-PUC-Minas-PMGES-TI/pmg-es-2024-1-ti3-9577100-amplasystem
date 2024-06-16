package amplasystem.api.controller;

import amplasystem.api.dtos.cliente.ResponseClienteDTO;
import amplasystem.api.exceptions.ObjectNotFoundException;
import amplasystem.api.models.Cliente;
import amplasystem.api.dtos.ResponseDTO;
import amplasystem.api.dtos.cliente.RequestClientDTO;
import amplasystem.api.services.ClienteService;
import jakarta.validation.Valid;
// import jakarta.validation.ValidationException;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController()
@RequestMapping("/cliente")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @GetMapping
    public ResponseEntity<List<ResponseClienteDTO>> getAllClientes() {
        List<ResponseClienteDTO> clientes = clienteService.getAllClientes();
        return new ResponseEntity<>(clientes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> getClienteById(@PathVariable Integer id) {
        Cliente cliente = clienteService.getById(id);
        return new ResponseEntity<>(cliente, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ResponseDTO> createCliente(@Valid @RequestBody RequestClientDTO requestClientDTO,
            Errors errors) {
        if (errors.hasErrors()) {
            ResponseDTO responseDTO = new ResponseDTO("Erro ao cadastrar cliente",
                    "Confira os dados informados");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseDTO);
        }

        ResponseClienteDTO createdCliente = clienteService.save(requestClientDTO);

        ResponseDTO responseDTO = new ResponseDTO("Cliente cadastrado com sucesso",
                "O cliente " + createdCliente.getNomeFantasia() + " agora esta cadastrado no sistema");
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseDTO> updateCliente(@PathVariable Integer id,
            @Valid @RequestBody RequestClientDTO requestClientDTO,
            Errors errors) {
        if (errors.hasErrors()) {
            requestClientDTO.setId(id);
            ResponseDTO responseDTO = new ResponseDTO("Erro ao atualizar cliente",
                    "Confira os dados informados");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseDTO);
        }

        ResponseClienteDTO updatedCliente = clienteService.update(requestClientDTO);
        ResponseDTO responseDTO = new ResponseDTO("Cliente atualizado  com sucesso",
                "O cliente " + updatedCliente.getNomeFantasia() + " foi atualizado no sistema");

        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseDTO> deleteCliente(@PathVariable Integer id) {
        try {
            clienteService.delete(id);
            ResponseDTO responseDTO = new ResponseDTO("Cliente deletado com sucesso",
                    "O cliente foi deletado do sistema");

            return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);

        } catch (Exception e) {
            ResponseDTO responseDTO = new ResponseDTO("Erro ao deletar cliente",
                    "O cliente não foi deletado do sistema, confira se existem pedidos faturados cadastrados \n "
                            + e.getMessage());

            return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
        }
    }

    @PostMapping("/tabela")
    public ResponseEntity<?> saveTable(@RequestParam MultipartFile file) {
        try {
            clienteService.createTable(file);
        } catch (ObjectNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (NullPointerException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

        return ResponseEntity.status(HttpStatus.CREATED).body("CREATED");
    }
}
