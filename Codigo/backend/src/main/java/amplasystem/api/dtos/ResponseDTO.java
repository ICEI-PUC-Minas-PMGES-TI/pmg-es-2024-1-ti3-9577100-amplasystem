package amplasystem.api.dtos;


public class ResponseDTO {
    private String titulo;
    private String message;

    public ResponseDTO( String titulo, String message) {
        this.titulo = titulo;
        this.message = message;
    }
    public String getTitulo() {
        return titulo;
    }

    public String getMessage() {
        return message;
    }
}
