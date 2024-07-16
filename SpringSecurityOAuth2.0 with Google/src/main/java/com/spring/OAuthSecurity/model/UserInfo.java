package com.spring.OAuthSecurity.model;

import com.spring.OAuthSecurity.utils.Enums;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user")
public class UserInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String email;
    private String password;
    private String imageUrl;
    private boolean emailVerified;

    @Enumerated(EnumType.STRING)
    private Enums.AuthProvider provider;

    private String providerId;

    @OneToMany(mappedBy = "userInfo", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<UserRole> userRoles;
}
