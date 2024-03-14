package amplasystem.api.services;

import amplasystem.api.dtos.VendedorDTO;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.stereotype.Service;

import amplasystem.api.dtos.ResponseTokenDTO;
import amplasystem.api.dtos.VendedorLoginDTO;
import amplasystem.api.exceptions.InvalidInformationException;
import amplasystem.api.models.Vendedor;
import amplasystem.api.utils.Cryptography;
import amplasystem.api.utils.Regex;
import jakarta.transaction.Transactional;

@Transactional
@Service
public class LoginService {

    @Autowired
    VendedorService vendedorService;

    @Value("${jwt.secret}")
    private String jwtSecret;
    private String jwt;

    public ResponseTokenDTO login(VendedorLoginDTO vendedorLoginDTO) throws AuthenticationCredentialsNotFoundException {
        if (!Regex.isValidEmail(vendedorLoginDTO.getEmail())) {
            throw new InvalidInformationException("email invalido");
        } else {
            Vendedor vendedor = vendedorService.getVendedoresByEmailToLogin(vendedorLoginDTO.getEmail());
            if (vendedorService.getBcrypt().matches(vendedorLoginDTO.getSenha(), vendedor.getSenha())) {
                this.jwt = JWT.create()
                        .withClaim("id", vendedor.getId().toString())
                        .withClaim("cargo", vendedor.getCargo().toString())
                        .sign(Algorithm.HMAC512(jwtSecret));


                return new ResponseTokenDTO(this.jwt);
            } else {
                throw new InvalidInformationException("dados invalidos");
            }
        }
    }

}
