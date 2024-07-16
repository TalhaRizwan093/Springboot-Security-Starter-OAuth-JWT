package com.spring.OAuthSecurity.utils;

public class Enums {

    public enum AuthProvider{
        local,
        google,
        github
    }

    public enum RoleType{
        ROLE_USER,
        ROLE_ADMIN,
        ROLE_MODERATOR;
    }

}
