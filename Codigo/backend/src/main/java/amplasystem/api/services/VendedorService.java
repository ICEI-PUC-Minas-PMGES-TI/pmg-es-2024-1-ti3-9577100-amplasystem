package amplasystem.api.services;

import amplasystem.api.dtos.ChangePasswordDTO;
import amplasystem.api.dtos.VendedorDTO;
import amplasystem.api.exceptions.ChangePasswordException;
import amplasystem.api.exceptions.ObjectNotFoundException;
import amplasystem.api.mappers.VendedorMapper;
import amplasystem.api.models.PasswordResetToken;
import amplasystem.api.models.Vendedor;
import amplasystem.api.repositories.PasswordTokenRepository;
import amplasystem.api.repositories.VendedorRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Transactional
@Service
public class VendedorService {
    @Autowired
    private VendedorRepository vendedorRepository;

    @Autowired
    private PasswordTokenRepository passwordTokenRepository;

    @Autowired
    private final PasswordEncoder encoder = new BCryptPasswordEncoder();

    public List<VendedorDTO> getAllVendedores() {
        return vendedorRepository.findAll().stream().map(VendedorMapper::toDTO).collect(Collectors.toList());
    }

    public PasswordEncoder getBcrypt() {
        return this.encoder;
    }

    public VendedorDTO getVendedoresByEmail(String email) throws ObjectNotFoundException {
        Vendedor vendedor = vendedorRepository.findByEmail(email);
        if (vendedor == null) {
            throw new ObjectNotFoundException("Email não cadastrado na base");
        }
        return VendedorMapper.toDTO(vendedor);
    }

    public VendedorDTO getVendedoresById(Integer id) throws ObjectNotFoundException {
        Vendedor vendedor = vendedorRepository.findById(id).get();
        return VendedorMapper.toDTO(vendedor);
    }

    private Vendedor getById(Integer id) throws ObjectNotFoundException {
        return vendedorRepository.findById(id).get();
    }

    public void changePassword(ChangePasswordDTO changePasswordDTO)
            throws ObjectNotFoundException, ChangePasswordException {
        if (changePasswordDTO.getToken() != null && !changePasswordDTO.getToken().isEmpty()) {

            Vendedor vendedor = vendedorRepository.findByEmail(changePasswordDTO.getEmail());
            PasswordResetToken token = passwordTokenRepository.findByVendedorAndToken(vendedor,
                    changePasswordDTO.getToken());
            if (token == null) {
                throw new ChangePasswordException("Token invalido");
            }
            if (vendedor == null) {
                throw new ObjectNotFoundException("Usuário não existente");
            }
            if (!changePasswordDTO.getNovaSenha().equals(changePasswordDTO.getConfirmacaoNovaSenha())) {
                throw new ChangePasswordException("Nova senha e a confirmação não são iguais");
            }

            System.out.println(vendedor.getSenha());

            vendedor.setSenha(changePasswordDTO.getNovaSenha());
            save(vendedor);
            passwordTokenRepository.delete(token);
        }
    }

    public void save(Vendedor vendedor) {
        vendedor.setSenha(this.encoder.encode(vendedor.getSenha()));
        vendedorRepository.save(vendedor);
    }

    public void update(Vendedor vendedor) {
        Vendedor vendedorInBase = getById(vendedor.getId());
        vendedor.setSenha(vendedorInBase.getSenha());
        vendedorRepository.save(vendedor);
    }

    public Vendedor getVendedoresByEmailToLogin(String email) {
        Vendedor vendedor = vendedorRepository.findByEmail(email);
        if (vendedor == null) {
            throw new ObjectNotFoundException("Confira se os campos estão corretos");
        }
        return vendedor;
    }

    public VendedorDTO deleteVendedorById(Integer id) throws EntityNotFoundException {
        Vendedor obj = this.getById(id);
        this.vendedorRepository.delete(obj);

        return VendedorMapper.toDTO(obj);
    }

    public void createPasswordResetTokenForUser(Integer id, String token) {
        Vendedor vendedor = this.getById(id);
        PasswordResetToken Basetoken = passwordTokenRepository.findByVendedor(vendedor);
        PasswordResetToken myToken;
        if(Basetoken == null){
            myToken = new PasswordResetToken(token, vendedor);
        } else {
            myToken = Basetoken;
            myToken.setToken(token);
        }

        passwordTokenRepository.save(myToken);
    }

    public Vendedor findByEmail(String email) {
        return vendedorRepository.findByEmail(email)
;    }
}
