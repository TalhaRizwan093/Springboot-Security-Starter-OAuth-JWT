package com.spring.OAuthSecurity.dto;


import com.spring.OAuthSecurity.model.UserRole;
import com.spring.OAuthSecurity.utils.Enums;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SignupRequest {

    @NotBlank(message = "Name must not be empty")
    private String name;

    @Email(message = "Must be email")
    @NotBlank(message = "Email must not be empty")
    private String email;

    @Pattern(regexp = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$", message = "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character")
    private String password;

    private String imageUrl;


}
