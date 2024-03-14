package amplasystem.api.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChangePasswordDTO {
    private String token;
    private String email;
    private String novaSenha;
    private String confirmacaoNovaSenha;
}

