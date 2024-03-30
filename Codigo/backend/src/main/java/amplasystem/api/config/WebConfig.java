package amplasystem.api.config;

import amplasystem.api.config.auth.SecurityConfig;
import amplasystem.api.enuns.Cargo;
import amplasystem.api.enuns.Faturamento;
import amplasystem.api.enuns.TipoContato;
import amplasystem.api.enuns.TipoFiscal;
import amplasystem.api.models.Financeiro;
import amplasystem.api.models.Industria;
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

    @Autowired
    private IndustriaRepository industriaRepository;

    @Autowired
    private FinanceiroRepository financeiroRepository;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedOrigins("*").allowedMethods("GET", "POST", "PUT", "DELETE");
    }

    @Override
    public void run(String... args) {
        Vendedor v1 = new Vendedor(null, "vendedor1@gmail.com", SecurityConfig.passwordEncoder().encode("senha"),
                "Pedro Henrique", Cargo.ADMINISTRADOR, new ArrayList<>());

        Industria i1 = new Industria(null, "Industria teste", new ArrayList<>(), null, new ArrayList<>());

        Financeiro f1 = new Financeiro(null, 10.0, Faturamento.Liquidez, TipoFiscal.REPRESENTACAO, i1);

        //i1.setFinanceiro(f1);

        vendedorRepository.save(v1);
        industriaRepository.save(i1);
        financeiroRepository.save(f1);
    }
}