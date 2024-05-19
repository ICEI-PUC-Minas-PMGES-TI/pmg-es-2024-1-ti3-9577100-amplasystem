package amplasystem.api.controller;

import amplasystem.api.dtos.cliente.ResponseClienteDTO;
import amplasystem.api.exceptions.ObjectNotFoundException;
import amplasystem.api.models.Cliente;
import amplasystem.api.dtos.cliente.RequestClientDTO;
import amplasystem.api.services.ClienteService;
import jakarta.validation.Valid;
import jakarta.validation.ValidationException;
import lombok.extern.log4j.Log4j;
import lombok.extern.log4j.Log4j2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController()
@RequestMapping("/cliente")
@Log4j2
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @GetMapping("/")
    public ResponseEntity<List<ResponseClienteDTO>> getAllClientes() {
        List<ResponseClienteDTO> clientes = clienteService.getAllClientes();
        return new ResponseEntity<>(clientes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> getClienteById(@PathVariable Integer id) {
        Cliente cliente = clienteService.getById(id);
        return new ResponseEntity<>(cliente, HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<ResponseClienteDTO> createCliente(@Valid @RequestBody RequestClientDTO requestClientDTO,
            Errors errors) {
        if (errors.hasErrors()) {
            throw new ValidationException(errors.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage).toList().get(0));
        }

        ResponseClienteDTO createdCliente = clienteService.save(requestClientDTO);

        return new ResponseEntity<>(createdCliente, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseClienteDTO> updateCliente(@Valid @RequestBody RequestClientDTO requestClientDTO,
            Errors errors) {
        if (errors.hasErrors()) {
            throw new ValidationException(errors.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage).toList().get(0));
        }

        ResponseClienteDTO updatedCliente = clienteService.update(requestClientDTO);
        return new ResponseEntity<>(updatedCliente, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCliente(@PathVariable Integer id) {
        clienteService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
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
