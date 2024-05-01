package amplasystem.api.controller;

import amplasystem.api.services.OrdemDeCompraService;
import amplasystem.api.dtos.ResponseDTO;
import amplasystem.api.exceptions.ObjectNotFoundException;
import amplasystem.api.models.OrdemDeCompra;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/ordem")
public class OrdemDeCompraController {

    @Autowired
    OrdemDeCompraService ordemDeCompraService;

    @GetMapping(value = "/")
    @ResponseBody
    public ResponseEntity<List<OrdemDeCompra>> getAllOrdemDeCompras() {
        return ResponseEntity.ok(ordemDeCompraService.getAllOrdemDeCompras());
    }

    @GetMapping(value = "/{id}")
    @ResponseBody
    public ResponseEntity<?> getOrdemDeCompraById(@PathVariable Integer id) throws NoSuchElementException {
        try {
            OrdemDeCompra ordemDeCompra = ordemDeCompraService.getOrdemDeCompraById(id);
            return ResponseEntity.ok(ordemDeCompra);
        } catch (NoSuchElementException e) {
            ResponseDTO errorResponse = new ResponseDTO("Ordem de compra não encontrada.",
                    e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }

    @PostMapping(value = "/")
    @ResponseBody
    public ResponseEntity<?> save(@RequestBody OrdemDeCompra ordemDeCompra) {
        try {
            OrdemDeCompra newOrder = ordemDeCompraService.save(ordemDeCompra);
            ResponseDTO responseDTO = new ResponseDTO("Ordem de compra cadastrada com Sucesso",
                    "A ordem " + newOrder.getCodigoPedido() + " agora esta cadastrado no sistema");
            return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
        } catch (IllegalStateException e) {
            ResponseDTO errorResponse = new ResponseDTO("Ordem de compra já cadastrada", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        } catch (Exception e) {
            ResponseDTO errorResponse = new ResponseDTO("Erro ao cadastrar indústria", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @DeleteMapping(value = "/{id}")
    @ResponseBody
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        try {
            ordemDeCompraService.delete(id);
            ResponseDTO responseDTO = new ResponseDTO("Ordem de compra deletado",
                    "A ordem foi deletado com sucesso!!");
            return ResponseEntity.status(HttpStatus.OK).body(responseDTO);

        } catch (ObjectNotFoundException e) {
            ResponseDTO errResponseDTO = new ResponseDTO("Ordem de compra não encontrado.",
                    "O vendedor não foi localizado em nossa base de dados");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errResponseDTO);
        } catch (DataIntegrityViolationException e) {
            ResponseDTO errResponseDTO = new ResponseDTO("Ordem de compra ",
                    "Existem relações com Pedidos Faturados para esta ordem, para deleta-lo, altere os pedidos faturados");
            return ResponseEntity.status(422).body(errResponseDTO);
        } catch (NoSuchElementException e) {
            ResponseDTO errResponseDTO = new ResponseDTO("Ordem de compra não encontrado",
                    e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errResponseDTO);
        }
    }

    @PutMapping(value = "/")
    @ResponseBody
    public ResponseEntity<?> update(@RequestBody OrdemDeCompra ordemDeCompra) {
        try {
            ordemDeCompraService.update(ordemDeCompra);
            ResponseDTO responseDTO = new ResponseDTO("Ordem de compra atualizado com Sucesso",
                    "Os dados da ordem agora estão atualizados no sistema");
            return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().build();
        } catch (DataIntegrityViolationException e) {
            ResponseDTO errResponseDTO = new ResponseDTO("Email ja cadastrado",
                    "o email informado para atualização ja esta cadastrado");
            return ResponseEntity.status(422).body(errResponseDTO);
        } catch (ObjectNotFoundException e) {
            ResponseDTO errResponseDTO = new ResponseDTO("Ordem de compra não encontrado",
                    e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errResponseDTO);
        } catch (NoSuchElementException e) {
            ResponseDTO errResponseDTO = new ResponseDTO("Ordem de compra não encontrado",
                    e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errResponseDTO);
        }
    }
}
