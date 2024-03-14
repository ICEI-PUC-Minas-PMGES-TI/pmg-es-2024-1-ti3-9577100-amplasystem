package amplasystem.api.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import amplasystem.api.dtos.ResponseDTO;
import amplasystem.api.dtos.ResponseTokenDTO;
import amplasystem.api.dtos.VendedorLoginDTO;
import amplasystem.api.exceptions.InvalidInformationException;
import amplasystem.api.services.LoginService;
import amplasystem.api.services.exceptions.ObjectNotFoundException;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(value = "/login")
public class LoginController {
    @Autowired
    LoginService loginService;

    @PostMapping
    @ResponseBody
    public ResponseEntity<?> login(@RequestBody VendedorLoginDTO vendedorLoginDTO) {
        try {
            ResponseTokenDTO responseTokenDTO = loginService.login(vendedorLoginDTO);
            return ResponseEntity.ok(responseTokenDTO);
        } catch (ObjectNotFoundException e) {
            ResponseDTO errorResponse = new ResponseDTO("Não encontrado",
                    e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (InvalidInformationException e) {
            ResponseDTO responseDTO = new ResponseDTO("Dados inválido",
                    e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseDTO);
        }
    }

}