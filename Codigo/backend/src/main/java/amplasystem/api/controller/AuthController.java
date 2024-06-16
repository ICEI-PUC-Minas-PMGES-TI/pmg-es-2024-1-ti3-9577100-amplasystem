package amplasystem.api.controller;

import amplasystem.api.config.auth.JwtTokenProvider;
import amplasystem.api.dtos.ChangePasswordDTO;
import amplasystem.api.dtos.ForgetPasswordDTO;
import amplasystem.api.dtos.ResponseDTO;
import amplasystem.api.dtos.VendedorDTO;
import amplasystem.api.dtos.auth.LoginRequest;
import amplasystem.api.dtos.auth.LoginResponse;
import amplasystem.api.exceptions.ChangePasswordException;
import amplasystem.api.exceptions.InvalidInformationException;
import amplasystem.api.exceptions.ObjectNotFoundException;
import amplasystem.api.services.EmailSenderService;
import amplasystem.api.services.VendedorService;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;
    
   @Autowired
    private EmailSenderService emailSenderService;

    @Autowired
    VendedorService vendedorService;
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getSenha()
                    )
            );

            String jwt = tokenProvider.generateToken(authentication);
            return ResponseEntity.ok(new LoginResponse(jwt));
        } catch (InvalidInformationException e) {
            ResponseDTO responseDTO = new ResponseDTO("Dados inválidos",
                    e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseDTO);
        }
    }

    @PostMapping("/changePassword")
    @ResponseBody
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordDTO changePasswordDTO) {
        try {
            vendedorService.changePassword(changePasswordDTO);
            return ResponseEntity.status(200).body("Password changed");
        } catch (ChangePasswordException e) {
            ResponseDTO errResponseDTO = new ResponseDTO("Confira os dados informados",
                    e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errResponseDTO);
        } catch (ObjectNotFoundException e) {
            ResponseDTO errResponseDTO = new ResponseDTO("Confira os dados informados",
                    e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errResponseDTO);
        } catch (Exception e) {
            ResponseDTO errResponseDTO = new ResponseDTO("System Error",
                    "Infelizmente estamos com dificuldade no sistema, tente novamente, se persistir entre em contato com o suporte");
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(errResponseDTO);
        }

    }

    @PostMapping("/forgotPassword")
    public ResponseEntity<?> sendToken(@RequestBody ForgetPasswordDTO forgetPasswordDTO) {
 
        try {
            VendedorDTO vendedor = vendedorService.getVendedoresByEmail(forgetPasswordDTO.getEmail());
            String token = UUID.randomUUID().toString().substring(0, 5);
            vendedorService.createPasswordResetTokenForUser(vendedor.getId(), token);
            emailSenderService.sendRecoveryPasswordMail(vendedor.getEmail(),token);
            return ResponseEntity.status(200).body("Email enviado para o usuário " + vendedor.getEmail());

        } catch (InvalidInformationException e) {
            ResponseDTO errResponseDTO = new ResponseDTO("Dados inválido",
                    e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errResponseDTO);
        } catch (ObjectNotFoundException e) {
            ResponseDTO errResponseDTO = new ResponseDTO("Vendedor não encontrado",
                    e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errResponseDTO);
        } catch (Exception e) {
            ResponseDTO errResponseDTO = new ResponseDTO("System Error",
                    "Infelizmente estamos com dificuldade no sistema, tente novamente, se persistir entre em contato com o suporte");
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(errResponseDTO);
        }
    }

}
