//package amplasystem.api.controller;
//
//import java.net.URI;
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.ResponseBody;
//import org.springframework.web.bind.annotation.RestController;
//
//import amplasystem.api.dtos.FinanceiroDTO;
//import amplasystem.api.models.Financeiro;
//import amplasystem.api.services.FinanceiroService;
//import lombok.extern.log4j.Log4j2;
//
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//
//@RestController
//@RequestMapping("/financeiro")
//@Log4j2
//public class FinanceiroController {
//
//    @Autowired
//    public FinanceiroService financeiroService;
//
//    @GetMapping
//    public ResponseEntity<List<FinanceiroDTO>> findAll() {
//        return ResponseEntity.ok().body(financeiroService.findAll());
//    }
//
//    @PostMapping
//    @ResponseBody
//    public ResponseEntity<Financeiro> create(@RequestBody FinanceiroDTO financeiroDTO) {
//        Financeiro newFinanceiro = financeiroService.create(financeiroDTO);
//
//        return new ResponseEntity<>(newFinanceiro, HttpStatus.CREATED);
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<?> update(@PathVariable Integer id, @RequestBody FinanceiroDTO financeiroDTO) {
//        try {
//            financeiroService.update(id, financeiroDTO);
//        } catch (NotFoundException e) {
//            log.equals(e);
//        }
//
//        return ResponseEntity.ok().build();
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<?> delete(@PathVariable Integer id) {
//        financeiroService.delete(id);
//        return ResponseEntity.noContent().build();
//    }
//
//}

package amplasystem.api.controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import amplasystem.api.dtos.FinanceiroDTO;
import amplasystem.api.models.Financeiro;
import amplasystem.api.services.FinanceiroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("Financeiro")
@RequestMapping("/financeiro")
@CrossOrigin(origins = "*")
public class FinanceiroController {

    @Autowired
    private FinanceiroService financeiroService;

    

    @GetMapping("/")
    public ResponseEntity<List<FinanceiroDTO>> getAll() {
        List<FinanceiroDTO> financeiro = financeiroService.findAll();
        return new ResponseEntity<>(financeiro, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FinanceiroDTO> getById(@PathVariable Integer id) {
        FinanceiroDTO financeiro = financeiroService.getById(id);
        return new ResponseEntity<>(financeiro, HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<Financeiro> createFinanceiro(@RequestBody FinanceiroDTO financeiro) {
        Financeiro createdFinanceiro = financeiroService.create(financeiro);
        return new ResponseEntity<>(createdFinanceiro, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FinanceiroDTO> update(@PathVariable Integer id, @RequestBody FinanceiroDTO financeiroDTO) {
        FinanceiroDTO updateFinanceiro = financeiroService.update(id, financeiroDTO);
        return new ResponseEntity<>(updateFinanceiro, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFinanceiro(@PathVariable Integer id) {
        financeiroService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}