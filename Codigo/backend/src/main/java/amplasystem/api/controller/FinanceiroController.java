package amplasystem.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import amplasystem.api.dtos.FinanceiroDTO;
import amplasystem.api.models.Financeiro;
import amplasystem.api.services.FinanceiroService;

@RestController
@RequestMapping("/financeiro")
public class FinanceiroController {

    @Autowired
    public FinanceiroService financeiroService;

    @GetMapping
    public ResponseEntity<List<FinanceiroDTO>> findAll() {
        return ResponseEntity.ok().body(financeiroService.findAll());
    }
}
