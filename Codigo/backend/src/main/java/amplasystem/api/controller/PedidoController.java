package amplasystem.api.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pedidos")
public class PedidoController {
    
    @GetMapping
    public String get() {
        return "AmplaSystems GET";
    }

    @PostMapping
    public String post() {
        return "AmplaSystems POST";
    }

    @PutMapping
    public String put() {
        return "AmplaSystems PUT";
    }

    @DeleteMapping
    public String delete() {
        return "AmplaSystems DELETE";
    }
}
