package com.spring.OAuthSecurity.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class ProductController {

    @GetMapping("/product")
    @PreAuthorize("hasRole('USER')")
    public String product(){
        return "This is user Product";
    }

    @GetMapping("/admin/product")
    @PreAuthorize("hasRole('ADMIN')")
    public String productAdmin(){
        return "This is admin Product";
    }
}
