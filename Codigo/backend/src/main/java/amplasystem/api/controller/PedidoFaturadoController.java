package amplasystem.api.controller;

import amplasystem.api.services.PedidoFaturadoService;
import amplasystem.api.dtos.PedidoFaturadoWithFinanceiro;
import amplasystem.api.dtos.ResponseDTO;
import amplasystem.api.exceptions.ObjectNotFoundException;
import amplasystem.api.models.PedidoFaturado;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pedido")
public class PedidoFaturadoController {

    @Autowired
    PedidoFaturadoService pedidoFaturadoService;

    @GetMapping(value = "/")
    @ResponseBody
    public ResponseEntity<List<PedidoFaturadoWithFinanceiro>> getAllPedidoFaturadosWithFinanceiro() {
        return ResponseEntity.ok(pedidoFaturadoService.getAllPedidoFaturadosWithFinanceiro());
    }
    
    @PostMapping(value = "/")
    @ResponseBody
    public ResponseEntity<?> save(@RequestBody PedidoFaturado PedidoFaturado) {
        try {
            PedidoFaturado newOrder = pedidoFaturadoService.save(PedidoFaturado);
            ResponseDTO responseDTO = new ResponseDTO("Pedido Faturado cadastrada com Sucesso",
                    "O pedido de nota Fiscal " + newOrder.getNotaFiscal() + " agora esta cadastrado no sistema");
            return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
        } catch (IllegalStateException e) {
            ResponseDTO errorResponse = new ResponseDTO("Pedido Faturado", e.getMessage());
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
            pedidoFaturadoService.delete(id);
            ResponseDTO responseDTO = new ResponseDTO("Pedido Faturado deletado",
                    "O pedido foi deletado com sucesso!!");
            return ResponseEntity.status(HttpStatus.OK).body(responseDTO);

        } catch (ObjectNotFoundException e) {
            ResponseDTO errResponseDTO = new ResponseDTO("Pedido Faturado não encontrado.",
                    "O vendedor não foi localizado em nossa base de dados");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errResponseDTO);
        } catch (NoSuchElementException e) {
            ResponseDTO errResponseDTO = new ResponseDTO("Pedido Faturado não encontrado",
                    e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errResponseDTO);
        }
            }

    @PutMapping(value = "/")
    @ResponseBody
    public ResponseEntity<?> update(@RequestBody PedidoFaturado pedidoFaturado) {
        try {
            pedidoFaturadoService.update(pedidoFaturado);
            ResponseDTO responseDTO = new ResponseDTO("Pedido Faturado atualizado com Sucesso",
                    "Os dados do pedido agora estão atualizados no sistema");
            return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().build();
        }catch (ObjectNotFoundException e) {
            ResponseDTO errResponseDTO = new ResponseDTO("Pedido Faturado não encontrado",
                    e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errResponseDTO);
        } catch (NoSuchElementException e) {
            ResponseDTO errResponseDTO = new ResponseDTO("Pedido Faturado não encontrado",
                    e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errResponseDTO);
        }
    }
}
