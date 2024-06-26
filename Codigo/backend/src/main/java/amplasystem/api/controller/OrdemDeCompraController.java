package amplasystem.api.controller;

import amplasystem.api.services.CreateExcelFileService;
import amplasystem.api.services.OrdemDeCompraService;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.logging.Logger;
import amplasystem.api.dtos.OrderFilterDto;
import amplasystem.api.dtos.ResponseDTO;
import amplasystem.api.exceptions.ObjectNotFoundException;
import amplasystem.api.models.OrdemDeCompra;
import org.springframework.core.io.FileSystemResource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/ordem_de_compra")
public class OrdemDeCompraController {

    @Autowired
    OrdemDeCompraService ordemDeCompraService;

    @Autowired
    CreateExcelFileService excelFileService;

    @GetMapping
    @ResponseBody
    public ResponseEntity<List<OrdemDeCompra>> getAllOrdemDeCompras() {
        return ResponseEntity.ok(ordemDeCompraService.getAllOrdemDeCompras());
    }

    @GetMapping("/{id}")
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

    @PostMapping
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

    @DeleteMapping("/{id}")
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

    @PutMapping
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

    @PostMapping("/filtered")
    public ResponseEntity<List<OrdemDeCompra>> getMethodName(@RequestBody OrderFilterDto param) {

        if (param.clienteId() != null && param.industriaId() != null) {
            return ResponseEntity.ok(ordemDeCompraService.getAllOrdemDeComprasByIndustriaIdAndClient(param));

        } else if (param.clienteId() != null) {
            return ResponseEntity.ok(ordemDeCompraService.getAllOrdemDeComprasByClientaId(param.clienteId()));

        } else if (param.industriaId() != null) {
            return ResponseEntity.ok(ordemDeCompraService.getAllOrdemDeComprasByIndustriaId(param.industriaId()));

        }

        return ResponseEntity.ok(ordemDeCompraService.getAllOrdemDeComprasWithWasNotFullPayment());

    }

    @GetMapping("/exportLastMonth")
    public ResponseEntity<FileSystemResource> getMethodName() {

        // Obter data atual
        LocalDate finalDate = LocalDate.now();

        // Subtrair um mês da data atual
        LocalDate initialDate = finalDate.minusMonths(1);
        excelFileService.createPurchaseOrderReport(
                ordemDeCompraService.getAllBettwoenDate((LocalDate) initialDate, finalDate));
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

    private static final Logger logger = Logger.getLogger(OrdemDeCompraController.class.getName());

    @GetMapping("/exportAll")
    public ResponseEntity<FileSystemResource> downloadArquivoXML() {

        excelFileService.createPurchaseOrderReport(ordemDeCompraService.getAllOrdemDeCompras());
        Path outputPath = Paths.get(System.getProperty("user.dir"), "Codigo", "backend", "src", "main", "java",
                "amplasystem", "api", "out",
                "purchaseOrdersReport.xlsx");

        logger.info("Attempting to find file at: " + outputPath.toString());

        File fileXlsx = outputPath.toFile();

        if (!fileXlsx.exists()) {
            logger.severe("File not found: " + outputPath.toString());
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
