package amplasystem.api.controller;

import amplasystem.api.services.IndustriaService;
import amplasystem.api.dtos.ResponseDTO;
import amplasystem.api.models.Industria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/industria")
public class IndustriaController {

    @Autowired
    IndustriaService industriaService;

    @GetMapping
    @ResponseBody
    public ResponseEntity<List<Industria>> getAllIndustrias() {
        return ResponseEntity.ok(industriaService.getAllIndustrias());
    }

    @GetMapping(value = "/withOutFinanceiro")
    @ResponseBody
    public ResponseEntity<List<Industria>> getAllIndustriasWithOutFinanceiro() {
        return ResponseEntity.ok(industriaService.getAllIndustriasWithOutFinanceiro());
    }

    @GetMapping(value = "/withFinanceiro")
    @ResponseBody
    public ResponseEntity<List<Industria>> getAllIndustriasWithFinanceiro() {
        return ResponseEntity.ok(industriaService.getAllIndustriasWithFinanceiro());
    }

    @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity<?> getIndustriaById(@PathVariable Integer id) throws NoSuchElementException {
        try {
            Industria industria = industriaService.getIndustriaById(id);
            return ResponseEntity.ok(industria);
        } catch (NoSuchElementException e) {
            ResponseDTO errorResponse = new ResponseDTO("Indústria não encontrada.",
                    e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }

    @PostMapping
    @ResponseBody
    public ResponseEntity<?> save(@RequestBody Industria industria) {
        try {

            ResponseDTO result = new ResponseDTO("Indústria cadastrada com sucesso!",
                    "A industria " + industria.getNome() + " foi cadastrada com sucesso!");
            return ResponseEntity.status(HttpStatus.OK).body(result);
        } catch (IllegalStateException e) {
            ResponseDTO errorResponse = new ResponseDTO("Indústria já cadastrada", e.getMessage());
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
            industriaService.delete(id);
        } catch (NoSuchElementException e) {
            ResponseDTO errorResponse = new ResponseDTO("Indústria não encontrada.",
                    e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
        return ResponseEntity.ok().build();
    }

    @PutMapping
    @ResponseBody
    public ResponseEntity<?> update(@RequestBody Industria industria) {
        try {
            industriaService.update(industria);
        } catch (NoSuchElementException e) {
            ResponseDTO errorResponse = new ResponseDTO("Indústria não encontrada.",
                    e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "/tabela")
    @ResponseBody
    public ResponseEntity<?> saveTable(@RequestParam MultipartFile file) {
        industriaService.createTable(file);
        return ResponseEntity.status(HttpStatus.CREATED).body("CREATED");
    }
}
