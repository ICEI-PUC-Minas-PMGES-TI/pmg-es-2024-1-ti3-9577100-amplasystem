package amplasystem.api.config;



import amplasystem.api.config.auth.SecurityConfig;
import amplasystem.api.enuns.Cargo;
import amplasystem.api.models.Vendedor;
import amplasystem.api.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.ArrayList;

@Configuration
@EnableWebMvc
@Component
public class WebConfig implements WebMvcConfigurer, CommandLineRunner {

    @Autowired
    private VendedorRepository vendedorRepository;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedOrigins("*").allowedMethods("GET", "POST","PUT", "DELETE");
    }

    @Override
    public void run(String... args) {
        Vendedor v1 = new Vendedor(null, "vendedor1@gmail.com", SecurityConfig.passwordEncoder().encode("senha"), "Pedro Henrique", Cargo.ADMINISTRADOR, new ArrayList<>());
        vendedorRepository.save(v1);
//        Cliente c1 = new Cliente(null, "60270975000161", "31988888888", "Belo Horizonte", "Rua dos bobos n0", "Empresa 1", v1, new ArrayList<>());
    }
}