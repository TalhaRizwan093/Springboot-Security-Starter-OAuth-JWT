package com.spring.OAuthSecurity.controller;

import com.spring.OAuthSecurity.exception.user.UserNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class UserController {

    @GetMapping("/user/exception")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> testUserException() {
        if(true){
            throw new UserNotFoundException("User");
        }
        return ResponseEntity.ok().build();
    }

}
