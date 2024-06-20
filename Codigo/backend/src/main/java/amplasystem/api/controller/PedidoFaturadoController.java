package amplasystem.api.controller;

import amplasystem.api.services.CreateExcelFileService;
import amplasystem.api.services.PedidoFaturadoService;
import amplasystem.api.dtos.PedidoFaturadoWithFinanceiro;
import amplasystem.api.dtos.ResponseDTO;
import amplasystem.api.exceptions.ObjectNotFoundException;
import amplasystem.api.models.PedidoFaturado;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pedido_faturado")
public class PedidoFaturadoController {

    @Autowired
    PedidoFaturadoService pedidoFaturadoService;

    @Autowired
    CreateExcelFileService excelFileService;

    @GetMapping
    @ResponseBody
    public ResponseEntity<List<PedidoFaturadoWithFinanceiro>> getAllPedidoFaturadosWithFinanceiro() {
        return ResponseEntity.ok(pedidoFaturadoService.getAllPedidoFaturadosWithFinanceiro());
    }

    @PostMapping
    @ResponseBody
    public ResponseEntity<ResponseDTO> save(@RequestBody PedidoFaturado PedidoFaturado) {
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

    @DeleteMapping("/{id}")
    @ResponseBody
    public ResponseEntity<ResponseDTO> delete(@PathVariable Integer id) {
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
        } catch (IllegalStateException e) {
            ResponseDTO responseDTO = new ResponseDTO("Pedido Faturado não atualizado",
                    e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseDTO);
        }
    }

    @PutMapping
    @ResponseBody
    public ResponseEntity<ResponseDTO> update(@RequestBody PedidoFaturado pedidoFaturado) {
        try {
            pedidoFaturadoService.update(pedidoFaturado);
            ResponseDTO responseDTO = new ResponseDTO("Pedido Faturado atualizado com Sucesso",
                    "Os dados do pedido agora estão atualizados no sistema");
            return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
        } catch (IllegalStateException e) {
            ResponseDTO responseDTO = new ResponseDTO("Pedido Faturado não atualizado",
                    e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseDTO);
        } catch (ObjectNotFoundException e) {
            ResponseDTO errResponseDTO = new ResponseDTO("Pedido Faturado não encontrado",
                    e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errResponseDTO);
        } catch (NoSuchElementException e) {
            ResponseDTO errResponseDTO = new ResponseDTO("Pedido Faturado não encontrado",
                    e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errResponseDTO);
        }
    }

    @GetMapping("/exportLastMonth")
    public ResponseEntity<FileSystemResource> getMethodName() {

        // Obter data atual
        LocalDate finalDate = LocalDate.now();

        // Subtrair um mês da data atual
        LocalDate initialDate = finalDate.minusMonths(1);
        excelFileService.createSellingReport(
                pedidoFaturadoService.getAllBettwoenDate((LocalDate) initialDate, finalDate));
        Path outputPath = Paths.get(System.getProperty("user.dir"), "Codigo", "backend", "src", "main", "java",
                "amplasystem", "api", "out",
                "purchaseOrdersReport.xlsx");

        File fileXlsx = outputPath.toFile();
        if (!fileXlsx.exists()) {
            return ResponseEntity.notFound().build();
        }

        String fileName = fileXlsx.getName();

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName);
        headers.setContentType(MediaType.APPLICATION_XML);

        return ResponseEntity.ok()
                .headers(headers)
                .body(new FileSystemResource(fileXlsx));
    }

    @GetMapping("/exportAll")
    public ResponseEntity<FileSystemResource> downloadArquivoXML() {
        excelFileService.createSellingReport(pedidoFaturadoService.getAllPedidoFaturados());
        Path outputPath = Paths.get(System.getProperty("user.dir"), "Codigo", "backend", "src", "main", "java",
                "amplasystem", "api", "out",
                "purchaseOrdersReport.xlsx");

        File fileXlsx = outputPath.toFile();
        if (!fileXlsx.exists()) {
            return ResponseEntity.notFound().build();
        }

        String fileName = fileXlsx.getName();

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName);
        headers.setContentType(MediaType.APPLICATION_XML);

        return ResponseEntity.ok()
                .headers(headers)
                .body(new FileSystemResource(fileXlsx));
    }
}
