package com.spring.OAuthSecurity.exception;

import com.spring.OAuthSecurity.exception.User.UserNotFoundException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.MissingServletRequestParameterException;
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
    public ResponseEntity<ErrorResponse> userNotFoundException(UserNotFoundException ex) {
        String message = messageSource.getMessage("user.notFound", new Object[]{ex.getMessage()}, LocaleContextHolder.getLocale());
        return new ResponseEntity<>(ErrorResponse
                .create(ex, HttpStatus.NOT_FOUND, message), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(SignatureException.class)
    public ResponseEntity<ErrorResponse> handleSignatureException(SignatureException ex) {
        String message = messageSource.getMessage("jwt.signature.exception", new Object[]{ex.getMessage()}, LocaleContextHolder.getLocale());
        return new ResponseEntity<>(ErrorResponse
                .create(ex, HttpStatus.UNAUTHORIZED, message), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(MalformedJwtException.class)
    public ResponseEntity<ErrorResponse> handleMalformedJwtException(MalformedJwtException ex) {
        String message = messageSource.getMessage("jwt.expired.exception", new Object[]{ex.getMessage()}, LocaleContextHolder.getLocale());
        return new ResponseEntity<>(ErrorResponse
                .create(ex, HttpStatus.BAD_REQUEST, message), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UnsupportedJwtException.class)
    public ResponseEntity<ErrorResponse> handleUnsupportedJwtException(UnsupportedJwtException ex) {
        String message = messageSource.getMessage("jwt.unsupported.exception", new Object[]{ex.getMessage()}, LocaleContextHolder.getLocale());
        return new ResponseEntity<>(ErrorResponse
                .create(ex, HttpStatus.BAD_REQUEST, message), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgumentException(IllegalArgumentException ex) {
        String message = messageSource.getMessage("illegal.argument.exception", new Object[]{ex.getMessage()}, LocaleContextHolder.getLocale());
        return new ResponseEntity<>(ErrorResponse
                .create(ex, HttpStatus.BAD_REQUEST, message), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<ErrorResponse> onMissingParameterException(
            MissingServletRequestParameterException ex) {
        String param = ex.getParameterName();
        String message =
                messageSource.getMessage(
                        "api.param.missing", new Object[] {param}, LocaleContextHolder.getLocale());
        return new ResponseEntity<>(ErrorResponse
                .create(ex, HttpStatus.BAD_REQUEST, message), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErrorResponse> onTypeMismatchException(
            MethodArgumentTypeMismatchException ex) {
        String message =
                messageSource.getMessage(
                        "api.type.mismatch",
                        new Object[] {ex.getName(), ex.getRequiredType().getName()},
                        LocaleContextHolder.getLocale());
        return new ResponseEntity<>(ErrorResponse
                .create(ex, HttpStatus.BAD_REQUEST, message), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public  ResponseEntity<ErrorResponse> onBadCredentialsException(BadCredentialsException ex){
        String message = messageSource.getMessage("auth.credentials.exception", new Object[]{ex.getMessage()}, LocaleContextHolder.getLocale());
        return new ResponseEntity<>(ErrorResponse
                .create(ex, HttpStatus.UNAUTHORIZED, message), HttpStatus.UNAUTHORIZED);
    }
}
