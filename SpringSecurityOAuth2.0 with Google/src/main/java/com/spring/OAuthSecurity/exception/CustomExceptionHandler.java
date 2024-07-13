package com.spring.OAuthSecurity.exception;

import com.spring.OAuthSecurity.exception.User.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@RestControllerAdvice
public class CustomExceptionHandler {

    final MessageSource messageSource;

    public CustomExceptionHandler(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> userNotFoundException(UserNotFoundException e) {
        String message = messageSource.getMessage("user.notFound", new Object[]{e.getMessage()}, LocaleContextHolder.getLocale());
        return new ResponseEntity<>(ErrorResponse
                .create(e, HttpStatus.NOT_FOUND, message), HttpStatus.NOT_FOUND);
    }

}
