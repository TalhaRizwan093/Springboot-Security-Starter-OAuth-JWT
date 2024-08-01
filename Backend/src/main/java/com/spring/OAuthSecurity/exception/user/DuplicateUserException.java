package com.spring.OAuthSecurity.exception.user;

import org.springframework.dao.DataIntegrityViolationException;

public class DuplicateUserException extends DataIntegrityViolationException {
    public DuplicateUserException(String message) {
        super(message);
    }
}
