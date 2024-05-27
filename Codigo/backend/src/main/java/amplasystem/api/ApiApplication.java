package amplasystem.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

@SpringBootApplication
public class ApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiApplication.class, args);

        // Teste de conexão com o banco de dados
        try (Connection connection = DriverManager.getConnection(
                "jdbc:mysql://google/amplasystemdb?cloudSqlInstance=amplasystem:southamerica-east1:amplasystemdb&socketFactory=com.google.cloud.sql.mysql.SocketFactory",
                "root",
                "root-esw")) {
            System.out.println("Conexão com o banco de dados estabelecida com sucesso!");
        } catch (SQLException e) {
            System.err.println("Falha ao conectar ao banco de dados: " + e.getMessage());
        }
    }
}
