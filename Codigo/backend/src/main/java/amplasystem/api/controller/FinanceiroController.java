package amplasystem.api.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import amplasystem.api.dtos.FinanceiroDTO;
import amplasystem.api.models.Financeiro;
import amplasystem.api.services.FinanceiroService;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.extern.log4j.Log4j2;

import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/financeiro")
@Log4j2
public class FinanceiroController {

    @Autowired
    public FinanceiroService financeiroService;

    @GetMapping
    public ResponseEntity<List<FinanceiroDTO>> findAll() {
        return ResponseEntity.ok().body(financeiroService.findAll());
    }

    @PostMapping
    public ResponseEntity<Financeiro> create(@RequestBody FinanceiroDTO financeiroDTO) {
        log.info(financeiroDTO);
        Financeiro newFinanceiro = financeiroService.create(financeiroDTO);

        return new ResponseEntity<>(newFinanceiro, HttpStatus.CREATED);
    }

    

}
