package amplasystem.api.services.auth;

import amplasystem.api.models.Vendedor;
import amplasystem.api.repositories.VendedorRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class AuthService implements UserDetailsService {

    @Autowired
    VendedorRepository vendedorRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Vendedor vendedor = vendedorRepository.findByEmail(email);

        if (vendedor == null) {
            throw new UsernameNotFoundException("Usuário não encontrado com o email: " + email);
        }

        List<GrantedAuthority> authorities = new ArrayList<>();

        authorities.add(new SimpleGrantedAuthority(vendedor.getCargo().name()));

        return new org.springframework.security.core.userdetails.User(vendedor.getEmail(), vendedor.getSenha(), authorities);
    }
}