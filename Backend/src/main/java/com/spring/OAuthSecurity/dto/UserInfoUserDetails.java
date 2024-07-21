package com.spring.OAuthSecurity.dto;

import com.spring.OAuthSecurity.model.UserInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserInfoUserDetails implements UserDetails {

    private String username;
    private String password;
    private List<GrantedAuthority> authorities;

    public UserInfoUserDetails(UserInfo userInfo) {
        this.username = userInfo.getEmail();
        this.password = userInfo.getPassword();
        this.authorities = userInfo.getUserRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getRole().getRole()))
                .collect(Collectors.toList());
    }
}
