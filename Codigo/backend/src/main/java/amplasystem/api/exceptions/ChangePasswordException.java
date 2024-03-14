package amplasystem.api.exceptions;

public class ChangePasswordException extends RuntimeException {

    public ChangePasswordException() {
        
    }
    public ChangePasswordException(String message) {
        super(message);
    }

    public ChangePasswordException(String message, Throwable cause) {
        super(message, cause);
    }
}
