package amplasystem.api.controller;

import amplasystem.api.dtos.ChangePasswordDTO;
import amplasystem.api.dtos.ForgetPasswordDTO;
import amplasystem.api.dtos.ResponseDTO;
import amplasystem.api.dtos.VendedorDTO;
import amplasystem.api.exceptions.ChangePasswordException;
import amplasystem.api.exceptions.InvalidInformationException;
import amplasystem.api.mappers.VendedorMapper;
import amplasystem.api.models.Vendedor;
import amplasystem.api.services.EmailSenderService;
import amplasystem.api.services.VendedorService;
import amplasystem.api.services.exceptions.ObjectNotFoundException;
import org.hibernate.ObjectDeletedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@RestController
@RequestMapping("/vendedor")
public class VendedorController {

    @Autowired
    private EmailSenderService emailSenderService;

    @Autowired
    VendedorService vendedorService;

    @GetMapping()
    @ResponseBody
    public ResponseEntity<List<VendedorDTO>> getAllVendedores() {
        return ResponseEntity.ok(vendedorService.getAllVendedores());
    }

    @GetMapping(value = "/getVendedor/{id}")
    @ResponseBody
    public ResponseEntity<?> getVendedorById(@PathVariable Integer id) throws ObjectNotFoundException {
        try {
            VendedorDTO vendedor = vendedorService.getVendedoresById(id);
            return ResponseEntity.ok(vendedor);
        } catch (ObjectDeletedException e) {
            ResponseDTO responseDTO = new ResponseDTO("Usuário não encontrado.",
                    e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseDTO);
        }
    }

    @PostMapping(value = "/admin/save")
    @ResponseBody
    public ResponseEntity<?> save(@RequestBody VendedorDTO vendedorDTO) {
        try {
            Vendedor vendedor = VendedorMapper.toVendedor(vendedorDTO);
            String password = UUID.randomUUID().toString().substring(0,5);
            vendedor.setSenha(password);
            System.out.println(vendedor.getSenha());
            vendedorService.save(vendedor);
            emailSenderService.sendNewUser(vendedor.getEmail(), password);
            ResponseDTO responseDTO = new ResponseDTO("Vendedor cadastrado com Sucesso",
                    "O vendedor " + vendedor.getNome() + " agora esta cadastrado no sistema");
            return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
        } catch (DataIntegrityViolationException e) {
            ResponseDTO errResponseDTO = new ResponseDTO("Email ja cadastrado",
                    "o email ja se encontra cadastrado, tente realizar o login");
            return ResponseEntity.status(422).body(errResponseDTO);
        } catch (Exception e) {
            ResponseDTO errResponseDTO = new ResponseDTO("System Error",
                    "Infelizmente estamos com dificuldade no sistema, tente novamente, se persistir entre em contato com o suporte");
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(errResponseDTO);
        }

    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> deleteVendedorById(@PathVariable Integer id) throws ObjectNotFoundException {
        try {
            VendedorDTO vendedor = vendedorService.deleteVendedorById(id);
            ResponseDTO responseDTO = new ResponseDTO("Vendedor deletado",
                    "O vendedor " + vendedor.getNome() + " foi deletado com sucesso!!");
            return ResponseEntity.status(HttpStatus.OK).body(responseDTO);

        } catch (ObjectNotFoundException e) {
            ResponseDTO errResponseDTO = new ResponseDTO("Vendedor não encontrado.",
                    "O vendedor não foi localizado em nossa base de dados");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errResponseDTO);
        } catch (DataIntegrityViolationException e) {
            ResponseDTO errResponseDTO = new ResponseDTO("Vendedor ",
                    "Existem relações com Clientes, Pedidos Faturados e Ordens de compra para este vendedor, para deleta-lo, altere o vendedor");
            return ResponseEntity.status(422).body(errResponseDTO);
        } catch (NoSuchElementException e) {
            ResponseDTO errResponseDTO = new ResponseDTO("Vendedor não encontrado",
                    e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errResponseDTO);
        }
    }

    
    @PutMapping("admin/update/{id}")
    @ResponseBody
    public ResponseEntity<?> update(@PathVariable Integer id, @RequestBody VendedorDTO vendedor) {
        try {
            VendedorDTO updatedVendedorDTO = vendedorService.getVendedoresById(id);
            vendedor.setId(updatedVendedorDTO.getId());
            vendedorService.update(VendedorMapper.toVendedor(vendedor));
            ResponseDTO responseDTO = new ResponseDTO("Vendedor atualizado com Sucesso",
                    "Os dados do vendedor " + vendedor.getNome() + " agora estão atualizados no sistema");
            return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().build();
        } catch (DataIntegrityViolationException e) {
            ResponseDTO errResponseDTO = new ResponseDTO("Email ja cadastrado",
                    "o email informado para atualização ja esta cadastrado");
            return ResponseEntity.status(422).body(errResponseDTO);
        } catch (ObjectNotFoundException e) {
            ResponseDTO errResponseDTO = new ResponseDTO("Vendedor não encontrado",
                    e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errResponseDTO);
        } catch (NoSuchElementException e) {
            ResponseDTO errResponseDTO = new ResponseDTO("Vendedor não encontrado",
                    e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errResponseDTO);
        }

    }

}
