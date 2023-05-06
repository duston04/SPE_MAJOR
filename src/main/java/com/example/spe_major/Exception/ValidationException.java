package com.example.spe_major.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.FORBIDDEN)
public class ValidationException extends RuntimeException{
    public ValidationException(String message) {
        super(message);
    }
}
