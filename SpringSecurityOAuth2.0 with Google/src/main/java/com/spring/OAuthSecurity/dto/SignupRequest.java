package com.spring.OAuthSecurity.dto;


import com.spring.OAuthSecurity.model.UserRole;
import com.spring.OAuthSecurity.utils.Enums;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SignupRequest {

    private String name;
    private String email;
    private String password;
    private String imageUrl;
    private boolean emailVerified;
    private Enums.AuthProvider provider;
    private String providerId;

}
