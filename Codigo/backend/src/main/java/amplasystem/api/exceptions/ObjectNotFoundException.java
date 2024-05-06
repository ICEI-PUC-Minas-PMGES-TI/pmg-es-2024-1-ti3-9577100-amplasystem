package amplasystem.api.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import jakarta.persistence.EntityExistsException;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ObjectNotFoundException  extends EntityExistsException{
    public ObjectNotFoundException(String message){
        super(message);
    }
}
