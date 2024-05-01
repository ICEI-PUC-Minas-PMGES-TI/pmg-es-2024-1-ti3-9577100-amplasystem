package amplasystem.api.config;

import amplasystem.api.config.auth.SecurityConfig;
import amplasystem.api.enuns.Cargo;
import amplasystem.api.enuns.Faturamento;
import amplasystem.api.enuns.TipoFiscal;
import amplasystem.api.models.Financeiro;
import amplasystem.api.models.Industria;
import amplasystem.api.models.Vendedor;
import amplasystem.api.repositories.*;
import lombok.extern.log4j.Log4j2;

import org.apache.commons.math3.analysis.function.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;

@Configuration
@EnableWebMvc
@Component
@Log4j2
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
        this.autoComplete();
    }

    @Value("${spring.profiles.active:}")
    private String activeProfiles;

    public void autoComplete() {    
        if (activeProfiles.trim().equals("test")) {
            Vendedor v1 = new Vendedor(null, "vendedor1@gmail.com", SecurityConfig.passwordEncoder().encode("senha"),
                    "Pedro Henrique", Cargo.ADMINISTRADOR, new ArrayList<>());
            Vendedor v2 = new Vendedor(null, "admin@admin", SecurityConfig.passwordEncoder().encode("admin"),
                    "Admin", Cargo.ADMINISTRADOR, new ArrayList<>());

            Industria i1 = new Industria(null, "Industria teste 1", new ArrayList<>(), null, new ArrayList<>());
            Industria i2 = new Industria(null, "Industria teste 2", new ArrayList<>(), null, new ArrayList<>());
            Industria i3 = new Industria(null, "Industria teste 3", new ArrayList<>(), null, new ArrayList<>());
            Industria i4 = new Industria(null, "Industria teste 4", new ArrayList<>(), null, new ArrayList<>());
            Financeiro f1 = new Financeiro(null, 10.0, Faturamento.Liquidez, TipoFiscal.REPRESENTACAO, i1);

            // i1.setFinanceiro(f1);

            vendedorRepository.save(v1);
            vendedorRepository.save(v2);
            industriaRepository.saveAll(Arrays.asList(i1, i2, i3, i4));
            financeiroRepository.save(f1);
        }
    }
}
